// ══════════════════════════════════════════════
//        أوامر الحماية - بوت العباسي
// ══════════════════════════════════════════════

// الكلمات المسيئة الافتراضية (مختصرة لأغراض التصفية)
const DEFAULT_BAD_WORDS = ['سب1', 'سب2', 'سب3', 'اهانة1'];

// أنماط الروابط
const LINK_PATTERNS = [
    /https?:\/\/[^\s]+/gi,
    /www\.[^\s]+/gi,
    /chat\.whatsapp\.com\/[^\s]+/gi,
    /t\.me\/[^\s]+/gi,
    /wa\.me\/[^\s]+/gi,
    /bit\.ly\/[^\s]+/gi,
];

// قائمة أوامر الحماية
const protectCmds = {
    // ── مكافحة الروابط ──
    'antilink': 'antilink_on', 'منع الروابط': 'antilink_on', 'حماية الروابط': 'antilink_on',
    'antilink+': 'antilink_on', 'antilink-': 'antilink_off',
    'تفعيل منع الروابط': 'antilink_on', 'إيقاف منع الروابط': 'antilink_off',

    // ── مكافحة السب ──
    'antisb': 'antisb_on', 'منع السب': 'antisb_on', 'حماية السب': 'antisb_on',
    'antisb+': 'antisb_on', 'antisb-': 'antisb_off',
    'تفعيل منع السب': 'antisb_on', 'إيقاف منع السب': 'antisb_off',
    'antisbad': 'antisb_on',

    // ── مكافحة التكرار ──
    'antispam': 'antispam_on', 'منع التكرار': 'antispam_on', 'حماية التكرار': 'antispam_on',
    'antispam+': 'antispam_on', 'antispam-': 'antispam_off',
    'تفعيل منع التكرار': 'antispam_on', 'إيقاف منع التكرار': 'antispam_off',

    // ── مكافحة الغزو ──
    'antiraid': 'antiraid_on', 'حماية الغزو': 'antiraid_on', 'منع الغزو': 'antiraid_on',
    'antiraid+': 'antiraid_on', 'antiraid-': 'antiraid_off',
    'تفعيل حماية الغزو': 'antiraid_on', 'إيقاف حماية الغزو': 'antiraid_off',

    // ── مكافحة البوتات ──
    'antibot': 'antibot_on', 'منع البوتات': 'antibot_on',
    'antibot+': 'antibot_on', 'antibot-': 'antibot_off',
    'تفعيل منع البوتات': 'antibot_on', 'إيقاف منع البوتات': 'antibot_off',

    // ── مكافحة المحتوى الفاضح ──
    'antinsfw': 'antinsfw_on', 'منع المحتوى الفاضح': 'antinsfw_on',
    'antinsfw+': 'antinsfw_on', 'antinsfw-': 'antinsfw_off',
    'تفعيل منع المحتوى الفاضح': 'antinsfw_on', 'إيقاف منع المحتوى الفاضح': 'antinsfw_off',

    // ── مكافحة التوجيه ──
    'antiforward': 'antiforward_on', 'منع التوجيه': 'antiforward_on',
    'antiforward+': 'antiforward_on', 'antiforward-': 'antiforward_off',
    'تفعيل منع التوجيه': 'antiforward_on', 'إيقاف منع التوجيه': 'antiforward_off',

    // ── الروابط المسموحة ──
    'رابط مسموح': 'addallowlink', 'addallowlink': 'addallowlink',
    'حذف رابط مسموح': 'delallowlink', 'delallowlink': 'delallowlink',
    'روابط مسموحة': 'allowlinklist', 'allowlinklist': 'allowlinklist',

    // ── نظام التحذيرات ──
    'تحذير': 'warn', 'warn': 'warn', 'انذار': 'warn',
    'تحذيرات': 'warnlist', 'warnlist': 'warnlist', 'عرض التحذيرات': 'warnlist',
    'مسح تحذير': 'clearwarn', 'clearwarn': 'clearwarn', 'تصفير تحذير': 'clearwarn',
    'تحديد التحذيرات': 'setwarnlimit', 'setwarnlimit': 'setwarnlimit', 'حد التحذيرات': 'setwarnlimit',

    // ── الحظر المحلي ──
    'حظر محلي': 'localban', 'localban': 'localban', 'حظر جروب': 'localban',
    'فك حظر محلي': 'localunban', 'localunban': 'localunban',
    'قائمة الحظر المحلي': 'localbanned', 'localbanned': 'localbanned',

    // ── التقارير ──
    'تقرير': 'report', 'report': 'report', 'بلغ': 'report',
    'التقارير': 'reportlist', 'reportlist': 'reportlist',
    'مسح التقارير': 'clearreports', 'clearreports': 'clearreports',

    // ── حالة الحماية ──
    'حالة الحماية': 'protectstatus', 'protectstatus': 'protectstatus', 'الحماية': 'protectstatus',
    'إحصائيات الحماية': 'protectstats', 'protectstats': 'protectstats',

    // ── المساعدة ──
    'helpprotect': 'helpprotect', 'مساعدة الحماية': 'helpprotect', 'أوامر الحماية': 'helpprotect',

    // ── وضع القفل الكامل ──
    'قفل كامل': 'fulllock_on', 'fulllock': 'fulllock_on',
    'فك القفل الكامل': 'fulllock_off', 'fulllock-': 'fulllock_off',

    // ── فلتر الكلمات ──
    'فلتر ذكي': 'smartfilter_on', 'smartfilter': 'smartfilter_on',
    'فلتر ذكي-': 'smartfilter_off',

    // ── سجل الانتهاكات ──
    'سجل الانتهاكات': 'violationlog', 'violationlog': 'violationlog',
    'مسح السجل': 'clearlog', 'clearlog': 'clearlog',
};

// ذاكرة مؤقتة لتتبع الرسائل المكررة
const spamMemory = {};
const raidMemory = {};

// ── التحقق من الحماية (يُستدعى لكل رسالة) ──
async function checkProtection(ctx) {
    const { sock, from, body, msg, sender, senderNumber, DB, config, isBotAdmin } = ctx;
    if (!from.endsWith('@g.us')) return false;
    if (!isBotAdmin) return false;

    let deleted = false;
    const settings = DB.settings;

    // 1. فحص الروابط
    if (settings.antilink?.[from]) {
        const hasLink = LINK_PATTERNS.some(p => p.test(body));
        if (hasLink) {
            const allowed = settings.allowedLinks || [];
            const isAllowed = allowed.some(l => body.includes(l));
            if (!isAllowed) {
                try {
                    await sock.sendMessage(from, {
                        delete: msg.key
                    });
                } catch { }
                await issueWarning(ctx, 'إرسال رابط غير مسموح');
                deleted = true;
            }
        }
    }

    // 2. فحص الكلمات المسيئة
    if (!deleted && settings.antibadwords?.[from]) {
        const badWords = settings.badWords || DEFAULT_BAD_WORDS;
        const lowerBody = body.toLowerCase();
        const hasBad = badWords.some(w => lowerBody.includes(w.toLowerCase()));
        if (hasBad) {
            try {
                await sock.sendMessage(from, { delete: msg.key });
            } catch { }
            await issueWarning(ctx, 'استخدام كلمات مسيئة');
            deleted = true;
        }
    }

    // 3. فحص التكرار (Spam)
    if (!deleted && settings.antispam?.[from]) {
        const now = Date.now();
        const key = `${senderNumber}_${from}`;
        if (!spamMemory[key]) spamMemory[key] = [];
        spamMemory[key] = spamMemory[key].filter(t => now - t < 8000);
        spamMemory[key].push(now);
        if (spamMemory[key].length >= 5) {
            spamMemory[key] = [];
            await issueWarning(ctx, 'إرسال رسائل متكررة (سبام)');
            deleted = true;
        }
    }

    // 4. فحص الرسائل المُعاد توجيهها
    if (!deleted && settings.antiforward?.[from]) {
        const isForwarded = msg.message?.extendedTextMessage?.contextInfo?.isForwarded ||
            msg.message?.imageMessage?.contextInfo?.isForwarded ||
            msg.message?.videoMessage?.contextInfo?.isForwarded;
        if (isForwarded) {
            try {
                await sock.sendMessage(from, { delete: msg.key });
            } catch { }
            await issueWarning(ctx, 'إرسال رسائل معاد توجيهها');
            deleted = true;
        }
    }

    return deleted;
}

// ── إصدار تحذير ──
async function issueWarning(ctx, reason) {
    const { sock, from, sender, senderNumber, DB, config, groupAdmins } = ctx;
    const maxWarn = DB.settings.warnLimit?.[from] || config.maxWarnings;

    if (!DB.warnings[from]) DB.warnings[from] = {};
    DB.warnings[from][senderNumber] = (DB.warnings[from][senderNumber] || 0) + 1;
    const warns = DB.warnings[from][senderNumber];

    global.saveAllDB();

    if (warns >= maxWarn) {
        // طرد تلقائي
        DB.warnings[from][senderNumber] = 0;
        global.saveAllDB();
        try {
            await sock.groupParticipantsUpdate(from, [sender], 'remove');
            await sock.sendMessage(from, {
                text: `🚫 تم طرد @${senderNumber} تلقائياً بسبب: ${reason}\n(تجاوز الحد الأقصى للتحذيرات: ${maxWarn})`,
                mentions: [sender],
            });
        } catch {
            await sock.sendMessage(from, {
                text: `⚠️ @${senderNumber} لقد تجاوزت الحد الأقصى للتحذيرات (${maxWarn})!\nالسبب: ${reason}`,
                mentions: [sender],
            });
        }
    } else {
        await sock.sendMessage(from, {
            text: `⚠️ تحذير لـ @${senderNumber}\n📋 السبب: ${reason}\n🔢 التحذيرات: ${warns}/${maxWarn}\n${warns >= maxWarn - 1 ? '⚠️ تحذير أخير! التالي سيؤدي للطرد.' : ''}`,
            mentions: [sender],
        });
    }
}

async function execute(ctx) {
    const { command } = ctx;
    const action = protectCmds[command];
    if (!action) return false;

    await handleProtectCmd(action, ctx);
    return true;
}

async function handleProtectCmd(action, ctx) {
    const { sock, from, text, args, reply, DB, config, isGroup, isBotAdmin, isSenderAdmin, isOwner, mentionedJid, sender } = ctx;

    if (!isGroup) { await reply(config.messages.groupOnly); return; }
    if (!isSenderAdmin && !isOwner) { await reply(config.messages.adminOnly); return; }

    const s = DB.settings;

    switch (action) {

        // ── منع الروابط ──
        case 'antilink_on': {
            if (!s.antilink) s.antilink = {};
            s.antilink[from] = true;
            global.saveAllDB();
            await reply('✅ تم تفعيل منع الروابط.\nسيُحذف أي رابط ويُعطى تحذير.');
            break;
        }
        case 'antilink_off': {
            if (s.antilink) s.antilink[from] = false;
            global.saveAllDB();
            await reply('🔴 تم إيقاف منع الروابط.');
            break;
        }

        // ── منع السب ──
        case 'antisb_on': {
            if (!s.antibadwords) s.antibadwords = {};
            s.antibadwords[from] = true;
            global.saveAllDB();
            await reply('✅ تم تفعيل منع السب والشتائم.\nستُحذف أي كلمات مسيئة ويُعطى تحذير.');
            break;
        }
        case 'antisb_off': {
            if (s.antibadwords) s.antibadwords[from] = false;
            global.saveAllDB();
            await reply('🔴 تم إيقاف فلتر الكلمات المسيئة.');
            break;
        }

        // ── منع التكرار ──
        case 'antispam_on': {
            if (!s.antispam) s.antispam = {};
            s.antispam[from] = true;
            global.saveAllDB();
            await reply('✅ تم تفعيل منع السبام (التكرار).\n5 رسائل في 8 ثوانٍ = تحذير.');
            break;
        }
        case 'antispam_off': {
            if (s.antispam) s.antispam[from] = false;
            global.saveAllDB();
            await reply('🔴 تم إيقاف منع التكرار.');
            break;
        }

        // ── حماية الغزو ──
        case 'antiraid_on': {
            if (!s.antiraid) s.antiraid = {};
            s.antiraid[from] = true;
            global.saveAllDB();
            await reply('✅ تم تفعيل حماية الغزو.\nإذا انضم أكثر من 5 أشخاص في دقيقة واحدة سيُقفل الجروب.');
            break;
        }
        case 'antiraid_off': {
            if (s.antiraid) s.antiraid[from] = false;
            global.saveAllDB();
            await reply('🔴 تم إيقاف حماية الغزو.');
            break;
        }

        // ── منع البوتات ──
        case 'antibot_on': {
            if (!s.antibot) s.antibot = {};
            s.antibot[from] = true;
            global.saveAllDB();
            await reply('✅ تم تفعيل منع البوتات.\nسيُطرد أي بوت ينضم للمجموعة.');
            break;
        }
        case 'antibot_off': {
            if (s.antibot) s.antibot[from] = false;
            global.saveAllDB();
            await reply('🔴 تم إيقاف منع البوتات.');
            break;
        }

        // ── منع المحتوى الفاضح ──
        case 'antinsfw_on': {
            if (!s.antinsfw) s.antinsfw = {};
            s.antinsfw[from] = true;
            global.saveAllDB();
            await reply('✅ تم تفعيل منع المحتوى الفاضح.');
            break;
        }
        case 'antinsfw_off': {
            if (s.antinsfw) s.antinsfw[from] = false;
            global.saveAllDB();
            await reply('🔴 تم إيقاف منع المحتوى الفاضح.');
            break;
        }

        // ── منع التوجيه ──
        case 'antiforward_on': {
            if (!s.antiforward) s.antiforward = {};
            s.antiforward[from] = true;
            global.saveAllDB();
            await reply('✅ تم تفعيل منع الرسائل المعاد توجيهها.');
            break;
        }
        case 'antiforward_off': {
            if (s.antiforward) s.antiforward[from] = false;
            global.saveAllDB();
            await reply('🔴 تم إيقاف منع الرسائل المعاد توجيهها.');
            break;
        }

        // ── إضافة رابط مسموح ──
        case 'addallowlink': {
            if (!text) { await reply('❌ أرسل الرابط المسموح.\nمثال: .رابط مسموح youtube.com'); break; }
            if (!s.allowedLinks) s.allowedLinks = [];
            if (s.allowedLinks.includes(text)) { await reply('⚠️ هذا الرابط مضاف مسبقاً.'); break; }
            s.allowedLinks.push(text);
            global.saveAllDB();
            await reply(`✅ تمت إضافة "${text}" إلى الروابط المسموحة.`);
            break;
        }

        // ── حذف رابط مسموح ──
        case 'delallowlink': {
            if (!text) { await reply('❌ أرسل الرابط.'); break; }
            const idx = s.allowedLinks?.indexOf(text);
            if (idx === -1 || idx === undefined) { await reply('⚠️ الرابط غير موجود.'); break; }
            s.allowedLinks.splice(idx, 1);
            global.saveAllDB();
            await reply(`✅ تم حذف "${text}" من الروابط المسموحة.`);
            break;
        }

        // ── قائمة الروابط المسموحة ──
        case 'allowlinklist': {
            if (!s.allowedLinks || s.allowedLinks.length === 0) { await reply('لا توجد روابط مسموحة.'); break; }
            const list = s.allowedLinks.map((l, i) => `${i + 1}. ${l}`).join('\n');
            await reply(`✅ *الروابط المسموحة*\n\n${list}`);
            break;
        }

        // ── إصدار تحذير ──
        case 'warn': {
            const target = mentionedJid[0];
            if (!target) { await reply('❌ منشن العضو.\nمثال: .تحذير @عضو'); break; }
            const targetNum = target.split('@')[0];
            const maxWarn = s.warnLimit?.[from] || config.maxWarnings;

            if (!DB.warnings[from]) DB.warnings[from] = {};
            DB.warnings[from][targetNum] = (DB.warnings[from][targetNum] || 0) + 1;
            const warns = DB.warnings[from][targetNum];
            global.saveAllDB();

            if (warns >= maxWarn) {
                DB.warnings[from][targetNum] = 0;
                global.saveAllDB();
                try {
                    await sock.groupParticipantsUpdate(from, [target], 'remove');
                    await sock.sendMessage(from, {
                        text: `🚫 تم طرد @${targetNum} بعد تجاوز الحد الأقصى للتحذيرات (${maxWarn}).`,
                        mentions: [target],
                    });
                } catch {
                    await reply(`⚠️ @${targetNum} تجاوز الحد الأقصى للتحذيرات.\nلا يمكن الطرد (البوت ليس أدمن).`);
                }
            } else {
                await sock.sendMessage(from, {
                    text: `⚠️ *تحذير*\n\n@${targetNum} لقد استلمت تحذيراً من الإدارة.\n🔢 التحذيرات: ${warns}/${maxWarn}\n${warns >= maxWarn - 1 ? '\n⚠️ تحذير أخير! التالي سيؤدي للطرد.' : ''}`,
                    mentions: [target],
                });
            }
            break;
        }

        // ── قائمة التحذيرات ──
        case 'warnlist': {
            const target2 = mentionedJid[0];
            if (target2) {
                const num2 = target2.split('@')[0];
                const warns2 = DB.warnings?.[from]?.[num2] || 0;
                await reply(`⚠️ تحذيرات @${num2}: ${warns2}/${s.warnLimit?.[from] || config.maxWarnings}`);
            } else {
                const groupWarns = DB.warnings?.[from];
                if (!groupWarns || Object.keys(groupWarns).length === 0) { await reply('لا توجد تحذيرات في هذه المجموعة.'); break; }
                const list = Object.entries(groupWarns)
                    .filter(([, w]) => w > 0)
                    .map(([num, w]) => `+${num}: ${w} تحذير`)
                    .join('\n');
                await reply(`⚠️ *التحذيرات في المجموعة*\n\n${list || 'لا توجد تحذيرات.'}`);
            }
            break;
        }

        // ── مسح تحذيرات عضو ──
        case 'clearwarn': {
            const target3 = mentionedJid[0];
            if (!target3) { await reply('❌ منشن العضو.'); break; }
            const num3 = target3.split('@')[0];
            if (DB.warnings[from]) DB.warnings[from][num3] = 0;
            global.saveAllDB();
            await reply(`✅ تم مسح تحذيرات @${num3}.`);
            break;
        }

        // ── تحديد حد التحذيرات ──
        case 'setwarnlimit': {
            const limit = parseInt(args[0]);
            if (!limit || limit < 1 || limit > 10) { await reply('❌ أرسل رقماً من 1 إلى 10.\nمثال: .تحديد التحذيرات 3'); break; }
            if (!s.warnLimit) s.warnLimit = {};
            s.warnLimit[from] = limit;
            global.saveAllDB();
            await reply(`✅ تم تحديد حد التحذيرات إلى ${limit} تحذير قبل الطرد.`);
            break;
        }

        // ── الحظر المحلي ──
        case 'localban': {
            const target4 = mentionedJid[0];
            if (!target4) { await reply('❌ منشن العضو.'); break; }
            const num4 = target4.split('@')[0];
            if (!s.localBanned) s.localBanned = {};
            if (!s.localBanned[from]) s.localBanned[from] = [];
            if (s.localBanned[from].includes(num4)) { await reply('⚠️ هذا العضو محظور مسبقاً.'); break; }
            s.localBanned[from].push(num4);
            global.saveAllDB();
            await reply(`🚫 تم حظر @${num4} في هذه المجموعة.`);
            break;
        }

        // ── فك الحظر المحلي ──
        case 'localunban': {
            const target5 = mentionedJid[0];
            if (!target5) { await reply('❌ منشن العضو.'); break; }
            const num5 = target5.split('@')[0];
            const idx2 = s.localBanned?.[from]?.indexOf(num5);
            if (idx2 === -1 || idx2 === undefined) { await reply('⚠️ هذا العضو غير محظور.'); break; }
            s.localBanned[from].splice(idx2, 1);
            global.saveAllDB();
            await reply(`✅ تم فك حظر @${num5} في هذه المجموعة.`);
            break;
        }

        // ── قائمة الحظر المحلي ──
        case 'localbanned': {
            const banned = s.localBanned?.[from];
            if (!banned || banned.length === 0) { await reply('لا يوجد محظورون محلياً.'); break; }
            const list = banned.map((n, i) => `${i + 1}. +${n}`).join('\n');
            await reply(`🚫 *المحظورون محلياً*\n\n${list}`);
            break;
        }

        // ── تقرير ──
        case 'report': {
            if (!text) { await reply('❌ أرسل سبب التقرير.'); break; }
            const reportMsg = `📋 *تقرير جديد*\n\n👤 المُبلِّغ: +${ctx.senderNumber}\n📍 الجروب: ${ctx.groupMetadata?.subject}\n📝 السبب: ${text}\n📅 التاريخ: ${new Date().toLocaleString('ar-SA')}`;
            try {
                await sock.sendMessage(`${config.ownerNumber}@s.whatsapp.net`, { text: reportMsg });
                await reply('✅ تم إرسال التقرير للمالك.');
            } catch {
                await reply('❌ فشل إرسال التقرير.');
            }
            break;
        }

        // ── حالة الحماية ──
        case 'protectstatus': {
            const st = s;
            await reply(
                `🛡️ *حالة الحماية في المجموعة*\n\n` +
                `🔗 منع الروابط: ${st.antilink?.[from] ? '✅ مفعّل' : '❌ معطل'}\n` +
                `🤬 منع السب: ${st.antibadwords?.[from] ? '✅ مفعّل' : '❌ معطل'}\n` +
                `📵 منع التكرار: ${st.antispam?.[from] ? '✅ مفعّل' : '❌ معطل'}\n` +
                `🌊 منع الغزو: ${st.antiraid?.[from] ? '✅ مفعّل' : '❌ معطل'}\n` +
                `🤖 منع البوتات: ${st.antibot?.[from] ? '✅ مفعّل' : '❌ معطل'}\n` +
                `🔞 منع المحتوى الفاضح: ${st.antinsfw?.[from] ? '✅ مفعّل' : '❌ معطل'}\n` +
                `📤 منع التوجيه: ${st.antiforward?.[from] ? '✅ مفعّل' : '❌ معطل'}\n` +
                `⚠️ حد التحذيرات: ${st.warnLimit?.[from] || config.maxWarnings}\n` +
                `🚫 المحظورون محلياً: ${st.localBanned?.[from]?.length || 0}`
            );
            break;
        }

        // ── القفل الكامل ──
        case 'fulllock_on': {
            if (!s.antilink) s.antilink = {};
            if (!s.antibadwords) s.antibadwords = {};
            if (!s.antispam) s.antispam = {};
            if (!s.antiforward) s.antiforward = {};
            s.antilink[from] = true;
            s.antibadwords[from] = true;
            s.antispam[from] = true;
            s.antiforward[from] = true;
            global.saveAllDB();
            await reply('🔒 *تم تفعيل وضع القفل الكامل*\n\nتم تفعيل جميع خيارات الحماية:\n✅ منع الروابط\n✅ منع السب\n✅ منع التكرار\n✅ منع التوجيه');
            break;
        }
        case 'fulllock_off': {
            if (s.antilink) s.antilink[from] = false;
            if (s.antibadwords) s.antibadwords[from] = false;
            if (s.antispam) s.antispam[from] = false;
            if (s.antiforward) s.antiforward[from] = false;
            global.saveAllDB();
            await reply('🔓 تم إيقاف جميع خيارات الحماية.');
            break;
        }

        // ── مساعدة الحماية ──
        case 'helpprotect': {
            await reply(`
🔒 *أوامر الحماية*
${config.line}

🔗 *الروابط*
• ${config.prefix}antilink — تفعيل منع الروابط
• ${config.prefix}antilink- — إيقاف منع الروابط
• ${config.prefix}رابط مسموح [رابط] — إضافة رابط مسموح
• ${config.prefix}روابط مسموحة — قائمة الروابط

🤬 *الكلمات المسيئة*
• ${config.prefix}antisb — تفعيل منع السب
• ${config.prefix}antisb- — إيقاف منع السب

📵 *مكافحة التكرار*
• ${config.prefix}antispam — تفعيل منع التكرار
• ${config.prefix}antispam- — إيقاف منع التكرار

🌊 *الغزو والبوتات*
• ${config.prefix}antiraid — تفعيل حماية الغزو
• ${config.prefix}antibot — تفعيل منع البوتات
• ${config.prefix}antiforward — منع الرسائل المحولة

⚠️ *التحذيرات*
• ${config.prefix}تحذير @عضو — إعطاء تحذير
• ${config.prefix}تحذيرات [@عضو] — عرض التحذيرات
• ${config.prefix}مسح تحذير @عضو — مسح التحذيرات
• ${config.prefix}تحديد التحذيرات [رقم] — حد الطرد

🚫 *الحظر المحلي*
• ${config.prefix}حظر محلي @عضو
• ${config.prefix}فك حظر محلي @عضو
• ${config.prefix}قائمة الحظر المحلي

📋 *أخرى*
• ${config.prefix}تقرير [سبب] — إرسال تقرير
• ${config.prefix}حالة الحماية — عرض الحالة
• ${config.prefix}قفل كامل — تفعيل كل الحماية
`.trim());
            break;
        }

        default:
            break;
    }
}

module.exports = { execute, checkProtection };
