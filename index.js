// ══════════════════════════════════════════════
//    بوت واتساب - ـ اﺣﻣد اﻟ۶ﺑاسيᯓ¹⁰
//    الإصدار: 2.0.0
// ══════════════════════════════════════════════

// ─── إسكات ضجيج libsignal و Baileys الداخلي ───
// هذه الرسائل طبيعية بعد الجلسة الجديدة ولا تؤثر على عمل البوت
const _origError = console.error.bind(console);
const _origLog   = console.log.bind(console);
const _noisePatterns = [
    'Bad MAC', 'Failed to decrypt', 'Session error',
    'Closing open session', 'Closing session:', 'SessionEntry',
    '_chains', 'registrationId', 'currentRatchet', 'ephemeralKeyPair',
    'pubKey', 'privKey', 'rootKey', 'indexInfo', 'pendingPreKey',
    'baseKey', 'preKeyId', 'signedKeyId', 'remoteIdentityKey',
    'MessageCounterError', 'Key used already',
];
console.error = (...a) => { const s = a.join(' '); if (_noisePatterns.some(p => s.includes(p))) return; _origError(...a); };
console.log   = (...a) => { const s = a.join(' '); if (_noisePatterns.some(p => s.includes(p))) return; _origLog(...a);   };
// ─────────────────────────────────────────────

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    isJidBroadcast,
    isJidGroup,
    jidDecode,
    proto,
    getContentType,
    Browsers,
} = require('@whiskeysockets/baileys');

const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// استيراد ملفات الأوامر
const ownerCommands = require('./commands/owner');
const groupCommands = require('./commands/group');
const protectionCommands = require('./commands/protection');
const funCommands = require('./commands/fun');
const toolsCommands = require('./commands/tools');

// إنشاء المجلدات الضرورية
const dirs = ['./session', './database'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 تم إنشاء مجلد: ${dir}`);
    }
});

// تهيئة قاعدة البيانات
const DB = {
    users: loadDB('users', { banned: [], vip: [], admins: [] }),
    groups: loadDB('groups', {}),
    warnings: loadDB('warnings', {}),
    settings: loadDB('settings', {
        botEnabled: true,
        autoReply: true,
        welcomeEnabled: {},
        goodbyeEnabled: {},
        welcomeMsg: {},
        goodbyeMsg: {},
        disabledGroups: [],
        badWords: config.badWords || [],
        allowedLinks: [],
        antispam: {},
        antilink: {},
        antibadwords: {},
        antiraid: {},
        antibot: {},
        antiforward: {},
        antinsfw: {},
        points: {},
        roles: {},
        localBanned: {},
    }),
};

// دالة تحميل قاعدة البيانات
function loadDB(name, defaultData) {
    const filePath = path.join('./database', `${name}.json`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
        return defaultData;
    }
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
    } catch {
        return defaultData;
    }
}

// دالة حفظ قاعدة البيانات
function saveDB(name, data) {
    const filePath = path.join('./database', `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// حفظ كل قواعد البيانات
global.saveAllDB = () => {
    saveDB('users', DB.users);
    saveDB('groups', DB.groups);
    saveDB('warnings', DB.warnings);
    saveDB('settings', DB.settings);
};

global.DB = DB;
global.config = config;
global.saveDB = saveDB;

// تتبع الرسائل لمكافحة السبام
const spamTracker = {};

// ── حالة الاتصال المركزية ──
let _connecting = false;   // هل الاتصال جارٍ الآن؟
let _reconnTimer = null;   // مؤقت إعادة الاتصال
let _reconnCount = 0;      // عداد المحاولات
let isShuttingDown = false; // هل البوت في وضع الإغلاق؟

// ── جدولة إعادة الاتصال (بدون تكرار) ──
function scheduleReconnect(delayMs) {
    if (isShuttingDown) return;
    if (_reconnTimer) { clearTimeout(_reconnTimer); _reconnTimer = null; }
    _reconnTimer = setTimeout(() => { _reconnTimer = null; startBot(); }, delayMs);
}

// ── تشغيل البوت ──
async function startBot() {
    if (_connecting || isShuttingDown) return;
    _connecting = true;

    // ── إغلاق الجلسة السابقة نظيفاً ──
    if (global.sock) {
        try { global.sock.ev.removeAllListeners(); } catch { }
        try { global.sock.end(); } catch { }
        global.sock = null;
        await new Promise(r => setTimeout(r, 1500));
    }

    console.log('\n╔══════════════════════════════════════╗');
    console.log('║     ـ اﺣﻣد اﻟ۶ﺑاسيᯓ¹⁰ - بوت واتساب     ║');
    console.log('║          الإصدار 2.0.0               ║');
    console.log('╚══════════════════════════════════════╝\n');
    console.log('⏳ جارٍ تحميل البوت...\n');

    // تهيئة جلسة المصادقة
    const { state, saveCreds } = await useMultiFileAuthState(config.sessionPath);

    // logger صامت — يمنع كل مخرجات Baileys الداخلية
    const noop = () => {};
    const silentLogger = { info: noop, debug: noop, warn: noop, error: noop, trace: noop, fatal: noop, child: () => silentLogger };

    // إنشاء الاتصال
    const sock = makeWASocket({
        version: [2, 3000, 1035194821],
        logger: silentLogger,
        printQRInTerminal: false,
        auth: state,
        browser: ['WhatsApp', 'Chrome', '4.0.0'],
        markOnlineOnConnect: false,
        generateHighQualityLinkPreview: false,
        syncFullHistory: false,
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 15000,
        retryRequestDelayMs: 500,
        maxMsgRetryCount: 3,
        getMessage: async () => ({ conversation: '' }),
    });

    global.sock = sock;
    // لا نضبط _connecting = false هنا — يبقى true حتى نعرف نتيجة الاتصال

    // ══════════════════════════════════════════
    //  معالجة تحديثات الاتصال
    // ══════════════════════════════════════════
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        // عرض QR Code
        if (qr) {
            console.log('\n════════════════════════════════════════');
            console.log('📱 امسح QR Code التالي من واتساب:');
            console.log('   واتساب > الأجهزة المرتبطة > ربط جهاز');
            console.log('════════════════════════════════════════\n');
            qrcode.generate(qr, { small: true });
            console.log('\n════════════════════════════════════════\n');
        }

        if (connection === 'connecting') {
            console.log('🔄 جارٍ الاتصال بواتساب...');
        }

        if (connection === 'open') {
            // ✅ اتصال ناجح — السماح بإعادة الاتصال مستقبلاً
            _connecting = false;
            _reconnCount = 0;
            global.botJid = sock.user?.id;
            config.botNumber = sock.user?.id?.split(':')[0] || config.ownerNumber;

            console.log('\n✅ تم الاتصال بنجاح!');
            console.log(`🤖 البوت: ${sock.user?.name || 'البوت'}`);
            console.log(`📱 الرقم: ${config.botNumber}`);
            console.log(`👑 المالك: ${config.ownerName}`);
            console.log('════════════════════════════════════════\n');

            // إشعار المالك
            setTimeout(async () => {
                try {
                    await sock.sendMessage(`${config.ownerNumber}@s.whatsapp.net`, {
                        text: `╔══════════════════════╗\n║                        ـ اﺣﻣد اﻟ۶ﺑاسيᯓ¹⁰     ║\n╚══════════════════════╝\n\n✅ *تم تشغيل البوت بنجاح!*\n\n🤖 الاسم: ${sock.user?.name}\n📱 الرقم: ${config.botNumber}\n📅 التاريخ: ${new Date().toLocaleString('ar-SA')}\n\n_${config.botName} جاهز للعمل_ 🚀`,
                    });
                } catch { /* تجاهل */ }
            }, 3000);
        }

        if (connection === 'close') {
            _connecting = false; // السماح بإعادة الاتصال

            const statusCode =
                lastDisconnect?.error?.output?.statusCode ||
                lastDisconnect?.error?.status ||
                lastDisconnect?.error?.code || 0;
            const reason = lastDisconnect?.error?.message || 'غير معروف';

            console.log(`\n❌ انقطع الاتصال | الكود: ${statusCode} | السبب: ${reason}`);

            // 401 = تسجيل خروج حقيقي — لا إعادة اتصال
            if (statusCode === DisconnectReason.loggedOut) {
                console.log('🔴 تم تسجيل الخروج. احذف مجلد session/ وأعد التشغيل.');
                return;
            }

            _reconnCount++;

            if (statusCode === 440) {
                // بعد 5 محاولات 440 متتالية: نظّف ملفات المفاتيح (مع إبقاء creds.json)
                // هذا يجبر واتساب على تفاوض مفاتيح جديدة ويحل تعارض الجلسة
                if (_reconnCount % 5 === 0) {
                    console.log('🧹 تنظيف ملفات الجلسة القديمة لحل تعارض 440...');
                    try {
                        const files = fs.readdirSync(config.sessionPath);
                        let deleted = 0;
                        for (const f of files) {
                            if (f !== 'creds.json') {
                                fs.unlinkSync(path.join(config.sessionPath, f));
                                deleted++;
                            }
                        }
                        console.log(`✅ تم حذف ${deleted} ملف — سيُجري واتساب تفاوضاً جديداً`);
                    } catch (e) { console.error('⚠️ فشل التنظيف:', e.message); }
                }
                const delay440 = Math.min(8000 + (_reconnCount * 1000), 30000);
                console.log(`⚠️ تعارض 440 — إعادة بعد ${delay440 / 1000}s (محاولة ${_reconnCount})`);
                scheduleReconnect(delay440);
                return;
            }

            const delay = Math.min(3000 * _reconnCount, 15000);
            console.log(`🔄 إعادة الاتصال بعد ${delay / 1000}s... (محاولة ${_reconnCount})`);
            scheduleReconnect(delay);
        }
    });

    // حفظ بيانات المصادقة
    sock.ev.on('creds.update', saveCreds);

    // ══════════════════════════════════════════
    //  معالجة الرسائل الواردة
    // ══════════════════════════════════════════
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        for (const msg of messages) {
            try {
                await handleMessage(sock, msg);
            } catch (err) {
                console.error('❌ خطأ في معالجة الرسالة:', err?.message || err);
            }
        }
    });

    // ══════════════════════════════════════════
    //  معالجة انضمام ومغادرة الأعضاء
    // ══════════════════════════════════════════
    sock.ev.on('group-participants.update', async (update) => {
        try {
            await handleGroupUpdate(sock, update);
        } catch (err) {
            console.error('❌ خطأ في تحديث المجموعة:', err?.message || err);
        }
    });

    return sock;
}

// ══════════════════════════════════════════
//  دالة معالجة الرسائل
// ══════════════════════════════════════════
async function handleMessage(sock, msg) {
    if (!msg.message) return;
    if (msg.key.remoteJid === 'status@broadcast') return;
    if (isJidBroadcast(msg.key.remoteJid)) return;

    const from = msg.key.remoteJid;
    const isGroup = isJidGroup(from);

    // تحديد المُرسِل بشكل صحيح
    // في المجموعات: participant هو المُرسِل الفعلي
    // في المحادثات: fromMe=true يعني المالك يكتب من هاتفه
    let sender;
    if (isGroup) {
        sender = msg.key.participant || msg.key.remoteJid;
    } else {
        sender = msg.key.fromMe
            ? `${config.ownerNumber}@s.whatsapp.net`
            : from;
    }

    const senderNumber = sender?.replace(/[^0-9]/g, '') || '';
    const pushName = msg.pushName || (msg.key.fromMe ? config.ownerName : 'مجهول');

    // المالك هو: رقمه مطابق أو هو صاحب الرسالة (fromMe في محادثة خاصة)
    const isOwner =
        msg.key.fromMe ||
        senderNumber === config.ownerNumber ||
        senderNumber === config.ownerNumber.replace(/^0/, '');

    // استخراج محتوى الرسالة مبكراً لفحص fromMe
    const type = getContentType(msg.message);
    const body = getMessageBody(msg, type);

    // تجاهل رسائل البوت التلقائية (fromMe بدون أمر)
    // لكن السماح بأوامر المالك حتى لو fromMe=true
    if (msg.key.fromMe && !body.startsWith(config.prefix)) return;

    // تجاهل المحظورين
    if (DB.users.banned.includes(senderNumber) && !isOwner) return;

    // تحليل الأمر
    const isCmd = body.startsWith(config.prefix);
    let command = '';
    let args = [];
    let text = '';

    if (isCmd) {
        // استخراج محتوى بعد البريفكس
        const bodyWithoutPrefix = body.slice(config.prefix.length).trim();
        // الأمر هو أول "كلمة" (حتى مسافة)
        const spaceIdx = bodyWithoutPrefix.indexOf(' ');
        if (spaceIdx === -1) {
            command = bodyWithoutPrefix;
            text = '';
            args = [];
        } else {
            command = bodyWithoutPrefix.slice(0, spaceIdx);
            text = bodyWithoutPrefix.slice(spaceIdx + 1).trim();
            args = text.split(' ').filter(a => a);
        }
    }

    const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

    // التحقق من تعطيل البوت في المجموعة
    if (isGroup && DB.settings.disabledGroups?.includes(from) && !isOwner) return;

    // التحقق من وضع الطوارئ
    if (DB.settings.emergency && !isOwner && isCmd) return;

    // الحصول على معلومات المجموعة
    let groupMetadata = null;
    let groupAdmins = [];
    let isBotAdmin = false;
    let isSenderAdmin = false;

    if (isGroup) {
        try {
            groupMetadata = await sock.groupMetadata(from);
            groupAdmins = groupMetadata.participants
                .filter(p => p.admin)
                .map(p => p.id);

            // التحقق من كون البوت أدمن
            const botId = global.botJid || '';
            const botIdShort = botId.split(':')[0] + '@s.whatsapp.net';
            isBotAdmin = groupAdmins.includes(botId) || groupAdmins.includes(botIdShort);
            isSenderAdmin = groupAdmins.includes(sender);
        } catch {
            // استمر حتى لو فشل جلب معلومات المجموعة
            groupMetadata = { subject: from, participants: [] };
        }
    }

    // كائن السياق الكامل
    const ctx = {
        sock,
        msg,
        from,
        sender,
        senderNumber,
        pushName,
        isOwner,
        isGroup,
        isBotAdmin,
        isSenderAdmin,
        groupMetadata,
        groupAdmins,
        type,
        body,
        command,
        args,
        text,
        mentionedJid,
        DB,
        config,
        reply: async (replyText, options = {}) => {
            return sock.sendMessage(from, { text: replyText, ...options }, { quoted: msg });
        },
        react: async (emoji) => {
            return sock.sendMessage(from, { react: { text: emoji, key: msg.key } });
        },
        send: async (content) => {
            return sock.sendMessage(from, content);
        },
    };

    // ══════════════════════════════════
    //  الردود الذكية
    // ══════════════════════════════════
    if (!isCmd && DB.settings.autoReply) {
        const lowerBody = body.toLowerCase();
        const botNum = config.botNumber || '';
        const mentioned = mentionedJid.some(j => j.includes(botNum));
        if (lowerBody.includes('السفاح') || lowerBody.includes('البوت') || mentioned) {
            await handleSmartReply(ctx);
            return;
        }
    }

    // ══════════════════════════════════
    //  فحص الحماية
    // ══════════════════════════════════
    if (isGroup && !isSenderAdmin && !isOwner) {
        const stopped = await protectionCommands.checkProtection(ctx);
        if (stopped) return;
    }

    // ══════════════════════════════════
    //  تنفيذ الأوامر
    // ══════════════════════════════════
    if (isCmd && command) {
        // مكافحة السبام للأوامر
        const spamKey = `${sender}_${from}`;
        const now = Date.now();
        if (!spamTracker[spamKey]) spamTracker[spamKey] = [];
        spamTracker[spamKey] = spamTracker[spamKey].filter(t => now - t < (config.spamTime || 10000));
        spamTracker[spamKey].push(now);

        if (spamTracker[spamKey].length > (config.spamLimit || 5) && !isOwner) {
            await ctx.reply('⚠️ أنت ترسل أوامر بسرعة كبيرة. انتظر قليلاً.');
            return;
        }

        console.log(`📩 [${isGroup ? (groupMetadata?.subject || 'جروب') : 'خاص'}] ${pushName}: ${config.prefix}${command}`);

        // أوامر المساعدة الرئيسية
        if (['مساعدة', 'help', 'قائمة', 'menu', 'start', 'بوت'].includes(command)) {
            await sendMainMenu(ctx);
            return;
        }

        // البحث عن الأمر في الملفات
        let executed = false;
        try { executed = await ownerCommands.execute(ctx); } catch (e) { console.error('owner err:', e.message); }
        if (!executed) try { executed = await groupCommands.execute(ctx); } catch (e) { console.error('group err:', e.message); }
        if (!executed) try { executed = await protectionCommands.execute(ctx); } catch (e) { console.error('protect err:', e.message); }
        if (!executed) try { executed = await funCommands.execute(ctx); } catch (e) { console.error('fun err:', e.message); }
        if (!executed) try { executed = await toolsCommands.execute(ctx); } catch (e) { console.error('tools err:', e.message); }

        if (!executed) {
            await ctx.reply(`❌ الأمر غير موجود: *${config.prefix}${command}*\nاكتب *${config.prefix}مساعدة* لعرض الأوامر.`);
        }
    }
}

// ══════════════════════════════════════════
//  معالجة انضمام ومغادرة الأعضاء
// ══════════════════════════════════════════
async function handleGroupUpdate(sock, update) {
    const { id, participants, action } = update;
    const groupData = DB.settings;

    if (action === 'add') {
        if (!groupData.welcomeEnabled?.[id]) return;
        for (const participant of participants) {
            const welcomeMsg = (groupData.welcomeMsg?.[id] || config.welcomeText || 'أهلاً @user بيننا!')
                .replace('@user', `@${participant.split('@')[0]}`)
                .replace('@group', '');
            try {
                await sock.sendMessage(id, { text: welcomeMsg, mentions: [participant] });
            } catch { /* تجاهل الخطأ */ }
        }
    }

    if (action === 'remove') {
        if (!groupData.goodbyeEnabled?.[id]) return;
        for (const participant of participants) {
            const goodbyeMsg = (groupData.goodbyeMsg?.[id] || config.goodbyeText || 'وداعاً @user!')
                .replace('@user', `@${participant.split('@')[0]}`)
                .replace('@group', '');
            try {
                await sock.sendMessage(id, { text: goodbyeMsg, mentions: [participant] });
            } catch { /* تجاهل الخطأ */ }
        }
    }
}

// ══════════════════════════════════════════
//  الردود الذكية
// ══════════════════════════════════════════
async function handleSmartReply(ctx) {
    const { body, pushName, reply } = ctx;
    const lower = body.toLowerCase();

    const responses = [
        { triggers: ['كيف حالك', 'كيفك', 'عامل إيه', 'كيف الحال'], reply: `أنا بخير يا ${pushName}! 😊\nاكتب *${config.prefix}مساعدة* لعرض الأوامر.` },
        { triggers: ['اهلا', 'مرحبا', 'هاي', 'سلام', 'هلا', 'السلام'], reply: `وعليكم السلام يا ${pushName}! 👋\nأهلاً بك مع *${config.botName}*\nاكتب *${config.prefix}مساعدة* للأوامر.` },
        { triggers: ['شكرا', 'شكراً', 'ثانكس', 'يسلمو', 'شكر'], reply: `عفواً يا ${pushName}! 😊 دائماً في الخدمة.` },
        { triggers: ['من انت', 'من أنت', 'ايش انت', 'مين انت'], reply: `أنا *${config.botName}* 🤖\nبوت واتساب بأكثر من 300 أمر.\nصاحبي: *${config.ownerName}*` },
        { triggers: ['مالكك', 'صاحبك', 'مين صنعك'], reply: `صاحبي: *${config.ownerName}* 👑` },
    ];

    for (const r of responses) {
        if (r.triggers.some(t => lower.includes(t))) {
            await reply(r.reply);
            return;
        }
    }

    await reply(`نعم يا ${pushName}؟ 😊\nاكتب *${config.prefix}مساعدة* لعرض الأوامر.`);
}

// ══════════════════════════════════════════
//  القائمة الرئيسية
// ══════════════════════════════════════════
async function sendMainMenu(ctx) {
    const { sock, from, msg, DB } = ctx;

    const headerText =
        `╔══════════════════════════╗\n` +
        `║   ـ اﺣﻣد اﻟ۶ﺑاسيᯓ¹⁰ 🤖      ║\n` +
        `╚══════════════════════════╝\n\n` +
        `🏷️ البريفكس: *${config.prefix}*  |  📦 الإصدار: *${config.botVersion}*\n` +
        `👑 المالك: *${config.ownerName}*\n` +
        `🚫 محظورون: ${DB.users.banned?.length || 0}  ⭐ VIP: ${DB.users.vip?.length || 0}`;

    // ── قائمة تفاعلية (أزرار) ──
    try {
        await sock.sendMessage(from, {
            text: headerText,
            footer: `${config.botName} | 300+ أمر 🚀`,
            title: '🤖 القائمة الرئيسية',
            buttonText: '📋 اختر القسم',
            sections: [
                {
                    title: '📋 أقسام الأوامر',
                    rows: [
                        { title: '👑 أوامر المالك',      rowId: `${config.prefix}helpowner`,   description: '60+ أمر للمالك فقط' },
                        { title: '👥 أوامر المجموعات',   rowId: `${config.prefix}helpgroup`,   description: '80+ أمر لإدارة الجروبات' },
                        { title: '🔒 أوامر الحماية',     rowId: `${config.prefix}helpprotect`, description: '50+ أمر للحماية والفلترة' },
                        { title: '🎉 أوامر الترفيه',     rowId: `${config.prefix}helpfun`,     description: '70+ أمر ألعاب ومرح' },
                        { title: '🔧 أوامر الأدوات',     rowId: `${config.prefix}helptools`,   description: '60+ أداة مفيدة' },
                    ],
                },
                {
                    title: '⬇️ التحميل',
                    rows: [
                        { title: '🎵 تحميل صوت',  rowId: `${config.prefix}صوت`,  description: 'ابحث عن أغنية وحمّلها مباشرة' },
                        { title: '📱 تحميل APK',  rowId: `${config.prefix}apk`,  description: 'ابحث عن تطبيق أندرويد وحمّله' },
                    ],
                },
                {
                    title: '📊 معلومات البوت',
                    rows: [
                        { title: '📊 إحصائيات', rowId: `${config.prefix}إحصائيات`, description: 'إحصائيات قاعدة البيانات' },
                        { title: '⚡ سرعة البوت', rowId: `${config.prefix}ping`,   description: 'سرعة استجابة البوت' },
                    ],
                },
            ],
            listType: 1,
        }, { quoted: msg });
    } catch {
        // ── fallback: رسالة نصية عادية ──
        await ctx.reply(
            `╔══════════════════════════╗\n` +
            `║   ـ اﺣﻣد اﻟ۶ﺑاسيᯓ¹⁰🤖      ║\n` +
            `╚══════════════════════════╝\n\n` +
            `🏷️ *البريفكس:* ${config.prefix}\n\n` +
            `👑 ${config.prefix}helpowner — أوامر المالك\n` +
            `👥 ${config.prefix}helpgroup — أوامر المجموعات\n` +
            `🔒 ${config.prefix}helpprotect — أوامر الحماية\n` +
            `🎉 ${config.prefix}helpfun — أوامر الترفيه\n` +
            `🔧 ${config.prefix}helptools — أوامر الأدوات\n` +
            `🎵 ${config.prefix}صوت [اسم] — تحميل صوت\n` +
            `📱 ${config.prefix}apk [اسم] — تحميل APK\n\n` +
            `_${config.botName} | 300+ أمر_ 🚀`
        );
    }
}

// ══════════════════════════════════════════
//  استخراج محتوى الرسالة
// ══════════════════════════════════════════
function getMessageBody(msg, type) {
    const m = msg.message;
    if (!m) return '';
    if (type === 'conversation') return m.conversation || '';
    if (type === 'extendedTextMessage') return m.extendedTextMessage?.text || '';
    if (type === 'imageMessage') return m.imageMessage?.caption || '';
    if (type === 'videoMessage') return m.videoMessage?.caption || '';
    if (type === 'buttonsResponseMessage') return m.buttonsResponseMessage?.selectedButtonId || '';
    if (type === 'listResponseMessage') return m.listResponseMessage?.singleSelectReply?.selectedRowId || '';
    if (type === 'templateButtonReplyMessage') return m.templateButtonReplyMessage?.selectedId || '';
    if (type === 'ephemeralMessage') return getMessageBody({ message: m.ephemeralMessage?.message }, getContentType(m.ephemeralMessage?.message));
    return '';
}

// حفظ تلقائي كل دقيقة
setInterval(() => { global.saveAllDB(); }, 60000);

// ══════════════════════════════════════════
//  إغلاق نظيف عند إيقاف العملية (SIGTERM/SIGINT)
//  هذا يمنع خطأ 440 "conflict" عند إعادة التشغيل
// ══════════════════════════════════════════
async function shutdown(signal) {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`\n🛑 استقبال إشارة ${signal} — جارٍ الإغلاق النظيف...`);

    // حفظ قاعدة البيانات
    try { global.saveAllDB(); } catch { }

    // إغلاق WebSocket بشكل صحيح حتى لا يبقى "شبح" على خوادم واتساب
    if (global.sock) {
        try {
            global.sock.end(undefined); // إغلاق نظيف بدون logout
            await new Promise(r => setTimeout(r, 1500));
        } catch { }
    }

    console.log('✅ تم الإغلاق بنجاح.');
    process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// معالجة الأخطاء — تجاهل أخطاء إغلاق الاتصال العادية
process.on('uncaughtException', (err) => {
    const msg = err?.message || '';
    if (msg.includes('Connection Closed') || msg.includes('Connection Failure') || msg.includes('ECONNRESET')) return;
    console.error('❌ خطأ غير متوقع:', msg);
});
process.on('unhandledRejection', (err) => {
    const msg = err?.message || '';
    if (msg.includes('Connection Closed') || msg.includes('Connection Failure') || msg.includes('ECONNRESET')) return;
    console.error('❌ رفض غير معالج:', msg);
});

// تشغيل البوت
startBot().catch(err => {
    console.error('❌ فشل في تشغيل البوت:', err?.message || err);
    setTimeout(() => startBot(), 5000);
});
