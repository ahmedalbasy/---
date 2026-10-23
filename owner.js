// ══════════════════════════════════════════════
//        أوامر المالك - ـ اﺣﻣد اﻟ۶ﺑاسيᯓ¹⁰
// ══════════════════════════════════════════════

const os = require('os');
const fs = require('fs');

// قائمة أوامر المالك مع aliases
const ownerCmds = {
    // ── التحكم في البوت ──
    'إيقاف': 'shutdown', 'ستوب': 'shutdown', 'وقف': 'shutdown', 'stop': 'shutdown',
    'تشغيل': 'boton', 'شغل': 'boton',
    'إعادة': 'restart', 'ريستارت': 'restart', 'restart': 'restart',
    'uptime': 'uptime', 'وقت التشغيل': 'uptime', 'مدة التشغيل': 'uptime',
    'حالة السيرفر': 'serverstatus', 'سيرفر': 'serverstatus',
    'الذاكرة': 'memory', 'ذاكرة': 'memory', 'ram': 'memory',
    'نسخة': 'version', 'version': 'version', 'إصدار': 'version',

    // ── الحظر وفك الحظر ──
    'حظر': 'ban', 'بلوك': 'ban', 'ban': 'ban',
    'فك حظر': 'unban', 'فك': 'unban', 'انبلوك': 'unban', 'unban': 'unban',
    'قائمة المحظورين': 'banlist', 'المحظورون': 'banlist', 'banlist': 'banlist',

    // ── VIP ──
    'إضافة vip': 'addvip', 'addvip': 'addvip', 'vip+': 'addvip',
    'إزالة vip': 'delvip', 'delvip': 'delvip', 'vip-': 'delvip',
    'قائمة vip': 'viplist', 'viplist': 'viplist', 'vip': 'viplist',

    // ── إدارة المشرفين ──
    'إضافة مشرف': 'addmod', 'addmod': 'addmod', 'مشرف+': 'addmod',
    'إزالة مشرف': 'delmod', 'delmod': 'delmod', 'مشرف-': 'delmod',
    'قائمة المشرفين': 'modlist', 'modlist': 'modlist', 'المشرفون': 'modlist',

    // ── الرسائل الجماعية ──
    'رسالة عامة': 'broadcast', 'broadcast': 'broadcast', 'بث': 'broadcast',
    'رسالة لكل الجروبات': 'broadcastgroup', 'broadcastg': 'broadcastgroup',

    // ── التحكم في المجموعات ──
    'تفعيل البوت': 'enablebot', 'enablebot': 'enablebot',
    'تعطيل البوت': 'disablebot', 'disablebot': 'disablebot',
    'جروبات معطلة': 'disabledlist', 'disabledlist': 'disabledlist',
    'قائمة الجروبات': 'grouplist', 'grouplist': 'grouplist', 'جروباتي': 'grouplist',
    'إخراج من جروب': 'leavegroup', 'leavegroup': 'leavegroup', 'طلع': 'leavegroup',

    // ── الإعدادات ──
    'تفعيل الردود': 'autoreply_on', 'rdods+': 'autoreply_on',
    'إيقاف الردود': 'autoreply_off', 'rdods-': 'autoreply_off',

    // ── قاعدة البيانات ──
    'تحديث قاعدة البيانات': 'dbsave', 'dbsave': 'dbsave', 'حفظ': 'dbsave',
    'إحصائيات': 'stats', 'stats': 'stats', 'احصاء': 'stats', 'إحصاء': 'stats',

    // ── أوامر المساعدة ──
    'helpowner': 'helpowner', 'مساعدة المالك': 'helpowner', 'أوامر المالك': 'helpowner',

    // ── الكلمات المحظورة ──
    'إضافة كلمة': 'addbadword', 'addbadword': 'addbadword', 'كلمة+': 'addbadword',
    'حذف كلمة': 'delbadword', 'delbadword': 'delbadword', 'كلمة-': 'delbadword',
    'قائمة الكلمات': 'badwordlist', 'badwordlist': 'badwordlist', 'الكلمات المحظورة': 'badwordlist',

    // ── إعدادات متقدمة ──
    'وضع الطوارئ': 'emergency_on', 'طوارئ': 'emergency_on',
    'إيقاف الطوارئ': 'emergency_off', 'طوارئ-': 'emergency_off',
    'رسالة مالك': 'ownermsg', 'ownermsg': 'ownermsg',

    // ── تغيير إعدادات البوت ──
    'تغيير الاسم': 'setnickname', 'setnickname': 'setnickname', 'اسم البوت': 'setnickname',
    'تغيير الحالة': 'setstatus', 'setstatus': 'setstatus', 'حالة البوت': 'setstatus',
    'تغيير الصورة': 'setpp', 'setpp': 'setpp',
};

async function execute(ctx) {
    const { command, isOwner, reply, ctx: _, ...rest } = ctx;
    const action = ownerCmds[command];
    if (!action) return false;

    // التحقق من صلاحية المالك
    if (!isOwner) {
        await ctx.reply(ctx.config.messages.ownerOnly);
        return true;
    }

    await handleOwnerCmd(action, ctx);
    return true;
}

async function handleOwnerCmd(action, ctx) {
    const { sock, from, text, args, reply, DB, config } = ctx;

    switch (action) {

        // ── إيقاف البوت ──
        case 'shutdown': {
            await reply('🔴 جارٍ إيقاف البوت...\nوداعاً! 👋');
            setTimeout(() => process.exit(0), 1000);
            break;
        }

        // ── تشغيل البوت ──
        case 'boton': {
            DB.settings.botEnabled = true;
            global.saveAllDB();
            await reply('✅ تم تشغيل البوت بنجاح!');
            break;
        }

        // ── إعادة تشغيل ──
        case 'restart': {
            await reply('🔄 جارٍ إعادة تشغيل البوت...');
            setTimeout(() => {
                process.exit(0);
            }, 1000);
            break;
        }

        // ── مدة التشغيل ──
        case 'uptime': {
            const uptime = process.uptime();
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);
            await reply(
                `⏱️ *مدة تشغيل البوت*\n\n` +
                `🕐 الساعات: ${hours}\n` +
                `🕐 الدقائق: ${minutes}\n` +
                `🕐 الثواني: ${seconds}\n\n` +
                `📅 ${new Date().toLocaleString('ar-SA')}`
            );
            break;
        }

        // ── حالة السيرفر ──
        case 'serverstatus': {
            const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
            const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
            const usedMem = (totalMem - freeMem).toFixed(2);
            const cpus = os.cpus();
            await reply(
                `🖥️ *حالة السيرفر*\n\n` +
                `💾 الذاكرة الكلية: ${totalMem} GB\n` +
                `📊 الذاكرة المستخدمة: ${usedMem} GB\n` +
                `🆓 الذاكرة الحرة: ${freeMem} GB\n` +
                `🖥️ المعالج: ${cpus[0]?.model || 'غير معروف'}\n` +
                `⚡ عدد النوى: ${cpus.length}\n` +
                `🐧 النظام: ${os.platform()} ${os.arch()}`
            );
            break;
        }

        // ── الذاكرة ──
        case 'memory': {
            const used = process.memoryUsage();
            await reply(
                `💾 *استخدام الذاكرة*\n\n` +
                `📦 RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB\n` +
                `📊 Heap Total: ${(used.heapTotal / 1024 / 1024).toFixed(2)} MB\n` +
                `📈 Heap Used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB\n` +
                `🔗 External: ${(used.external / 1024 / 1024).toFixed(2)} MB`
            );
            break;
        }

        // ── الإصدار ──
        case 'version': {
            await reply(
                `🤖 *${config.botName}*\n\n` +
                `📦 الإصدار: ${config.botVersion}\n` +
                `👑 المالك: ${config.ownerName}\n` +
                `🔗 الاتصال: ${config.ownerLink}\n` +
                `📅 التاريخ: ${new Date().toLocaleString('ar-SA')}`
            );
            break;
        }

        // ── حظر مستخدم ──
        case 'ban': {
            let target = args[0]?.replace(/[^0-9]/g, '');
            if (!target && ctx.mentionedJid.length > 0) {
                target = ctx.mentionedJid[0].replace(/[^0-9]/g, '');
            }
            if (!target) {
                await reply('❌ أذكر رقم المستخدم أو منشنه.\nمثال: .حظر @مستخدم');
                break;
            }
            if (DB.users.banned.includes(target)) {
                await reply('⚠️ هذا المستخدم محظور مسبقاً.');
                break;
            }
            DB.users.banned.push(target);
            global.saveAllDB();
            await reply(`🚫 تم حظر المستخدم +${target} بنجاح.`);
            break;
        }

        // ── فك الحظر ──
        case 'unban': {
            let target = args[0]?.replace(/[^0-9]/g, '');
            if (!target && ctx.mentionedJid.length > 0) {
                target = ctx.mentionedJid[0].replace(/[^0-9]/g, '');
            }
            if (!target) {
                await reply('❌ أذكر رقم المستخدم.\nمثال: .فك حظر @مستخدم');
                break;
            }
            const idx = DB.users.banned.indexOf(target);
            if (idx === -1) {
                await reply('⚠️ هذا المستخدم غير محظور.');
                break;
            }
            DB.users.banned.splice(idx, 1);
            global.saveAllDB();
            await reply(`✅ تم فك حظر المستخدم +${target} بنجاح.`);
            break;
        }

        // ── قائمة المحظورين ──
        case 'banlist': {
            if (DB.users.banned.length === 0) {
                await reply('✅ لا يوجد مستخدمون محظورون.');
                break;
            }
            const list = DB.users.banned.map((n, i) => `${i + 1}. +${n}`).join('\n');
            await reply(`🚫 *قائمة المحظورين*\n\n${list}\n\nإجمالي: ${DB.users.banned.length}`);
            break;
        }

        // ── إضافة VIP ──
        case 'addvip': {
            let target = args[0]?.replace(/[^0-9]/g, '');
            if (!target && ctx.mentionedJid.length > 0) {
                target = ctx.mentionedJid[0].replace(/[^0-9]/g, '');
            }
            if (!target) { await reply('❌ أذكر رقم المستخدم.'); break; }
            if (DB.users.vip.includes(target)) { await reply('⚠️ هذا المستخدم VIP مسبقاً.'); break; }
            DB.users.vip.push(target);
            global.saveAllDB();
            await reply(`⭐ تم إضافة +${target} إلى قائمة VIP.`);
            break;
        }

        // ── إزالة VIP ──
        case 'delvip': {
            let target = args[0]?.replace(/[^0-9]/g, '');
            if (!target && ctx.mentionedJid.length > 0) {
                target = ctx.mentionedJid[0].replace(/[^0-9]/g, '');
            }
            if (!target) { await reply('❌ أذكر رقم المستخدم.'); break; }
            const i = DB.users.vip.indexOf(target);
            if (i === -1) { await reply('⚠️ هذا المستخدم ليس VIP.'); break; }
            DB.users.vip.splice(i, 1);
            global.saveAllDB();
            await reply(`✅ تم إزالة +${target} من قائمة VIP.`);
            break;
        }

        // ── قائمة VIP ──
        case 'viplist': {
            if (DB.users.vip.length === 0) { await reply('لا يوجد أعضاء VIP حالياً.'); break; }
            const list = DB.users.vip.map((n, i) => `${i + 1}. ⭐ +${n}`).join('\n');
            await reply(`⭐ *قائمة VIP*\n\n${list}\n\nإجمالي: ${DB.users.vip.length}`);
            break;
        }

        // ── إضافة مشرف بوت ──
        case 'addmod': {
            let target = args[0]?.replace(/[^0-9]/g, '');
            if (!target && ctx.mentionedJid.length > 0) {
                target = ctx.mentionedJid[0].replace(/[^0-9]/g, '');
            }
            if (!target) { await reply('❌ أذكر رقم المستخدم.'); break; }
            if (!DB.users.admins) DB.users.admins = [];
            if (DB.users.admins.includes(target)) { await reply('⚠️ هذا المستخدم مشرف مسبقاً.'); break; }
            DB.users.admins.push(target);
            global.saveAllDB();
            await reply(`🛡️ تم تعيين +${target} مشرفاً للبوت.`);
            break;
        }

        // ── إزالة مشرف ──
        case 'delmod': {
            let target = args[0]?.replace(/[^0-9]/g, '');
            if (!target && ctx.mentionedJid.length > 0) {
                target = ctx.mentionedJid[0].replace(/[^0-9]/g, '');
            }
            if (!target) { await reply('❌ أذكر رقم المستخدم.'); break; }
            const idx2 = DB.users.admins?.indexOf(target);
            if (idx2 === -1 || idx2 === undefined) { await reply('⚠️ هذا المستخدم ليس مشرفاً.'); break; }
            DB.users.admins.splice(idx2, 1);
            global.saveAllDB();
            await reply(`✅ تم إزالة +${target} من المشرفين.`);
            break;
        }

        // ── قائمة المشرفين ──
        case 'modlist': {
            if (!DB.users.admins || DB.users.admins.length === 0) { await reply('لا يوجد مشرفون للبوت حالياً.'); break; }
            const list = DB.users.admins.map((n, i) => `${i + 1}. 🛡️ +${n}`).join('\n');
            await reply(`🛡️ *مشرفو البوت*\n\n${list}\n\nإجمالي: ${DB.users.admins.length}`);
            break;
        }

        // ── رسالة عامة ──
        case 'broadcast': {
            if (!text) { await reply('❌ أرسل نص الرسالة.\nمثال: .رسالة عامة مرحباً بالجميع'); break; }
            const chats = await sock.groupFetchAllParticipating();
            let sent = 0;
            for (const jid of Object.keys(chats)) {
                try {
                    await sock.sendMessage(jid, { text: `📢 *رسالة من المالك*\n\n${text}` });
                    sent++;
                } catch { }
                await delay(500);
            }
            await reply(`✅ تم إرسال الرسالة إلى ${sent} مجموعة.`);
            break;
        }

        // ── تفعيل البوت في جروب ──
        case 'enablebot': {
            const groupId = args[0] || from;
            const idx3 = DB.settings.disabledGroups?.indexOf(groupId);
            if (idx3 !== -1 && idx3 !== undefined) {
                DB.settings.disabledGroups.splice(idx3, 1);
                global.saveAllDB();
                await reply('✅ تم تفعيل البوت في هذه المجموعة.');
            } else {
                await reply('⚠️ البوت مفعّل مسبقاً في هذه المجموعة.');
            }
            break;
        }

        // ── تعطيل البوت في جروب ──
        case 'disablebot': {
            const groupId2 = args[0] || from;
            if (!DB.settings.disabledGroups) DB.settings.disabledGroups = [];
            if (DB.settings.disabledGroups.includes(groupId2)) {
                await reply('⚠️ البوت معطّل مسبقاً.');
                break;
            }
            DB.settings.disabledGroups.push(groupId2);
            global.saveAllDB();
            await reply('🔴 تم تعطيل البوت في هذه المجموعة.');
            break;
        }

        // ── قائمة الجروبات المعطلة ──
        case 'disabledlist': {
            if (!DB.settings.disabledGroups || DB.settings.disabledGroups.length === 0) {
                await reply('✅ لا توجد مجموعات معطلة.');
                break;
            }
            const list = DB.settings.disabledGroups.map((g, i) => `${i + 1}. ${g}`).join('\n');
            await reply(`🔴 *المجموعات المعطلة*\n\n${list}`);
            break;
        }

        // ── قائمة الجروبات ──
        case 'grouplist': {
            const chats2 = await sock.groupFetchAllParticipating();
            const groups = Object.values(chats2);
            const list = groups.map((g, i) => `${i + 1}. ${g.subject} (${g.participants.length} عضو)`).join('\n');
            await reply(`📋 *المجموعات* (${groups.length})\n\n${list}`);
            break;
        }

        // ── الخروج من جروب ──
        case 'leavegroup': {
            if (!ctx.isGroup) { await reply('❌ هذا الأمر للمجموعات فقط.'); break; }
            await reply('👋 وداعاً! تم أمر البوت بمغادرة المجموعة.');
            await delay(1000);
            await sock.groupLeave(from);
            break;
        }

        // ── تفعيل الردود التلقائية ──
        case 'autoreply_on': {
            DB.settings.autoReply = true;
            global.saveAllDB();
            await reply('✅ تم تفعيل الردود التلقائية.');
            break;
        }

        // ── إيقاف الردود التلقائية ──
        case 'autoreply_off': {
            DB.settings.autoReply = false;
            global.saveAllDB();
            await reply('🔴 تم إيقاف الردود التلقائية.');
            break;
        }

        // ── حفظ قاعدة البيانات ──
        case 'dbsave': {
            global.saveAllDB();
            await reply('✅ تم حفظ قاعدة البيانات.');
            break;
        }

        // ── الإحصائيات ──
        case 'stats': {
            const chats3 = await sock.groupFetchAllParticipating();
            const groups = Object.values(chats3);
            const totalMembers = groups.reduce((sum, g) => sum + g.participants.length, 0);
            await reply(
                `📊 *إحصائيات البوت*\n\n` +
                `🤖 البوت: ${config.botName}\n` +
                `📦 الإصدار: ${config.botVersion}\n\n` +
                `📋 المجموعات: ${groups.length}\n` +
                `👥 إجمالي الأعضاء: ${totalMembers}\n` +
                `🚫 المحظورون: ${DB.users.banned.length}\n` +
                `⭐ VIP: ${DB.users.vip?.length || 0}\n` +
                `🛡️ المشرفون: ${DB.users.admins?.length || 0}\n\n` +
                `💾 الذاكرة: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n` +
                `⏱️ مدة التشغيل: ${formatUptime(process.uptime())}`
            );
            break;
        }

        // ── إضافة كلمة محظورة ──
        case 'addbadword': {
            if (!text) { await reply('❌ أرسل الكلمة.\nمثال: .إضافة كلمة الكلمةالمحظورة'); break; }
            if (!DB.settings.badWords) DB.settings.badWords = [];
            if (DB.settings.badWords.includes(text.toLowerCase())) {
                await reply('⚠️ هذه الكلمة مضافة مسبقاً.');
                break;
            }
            DB.settings.badWords.push(text.toLowerCase());
            global.saveAllDB();
            await reply(`✅ تم إضافة "${text}" إلى قائمة الكلمات المحظورة.`);
            break;
        }

        // ── حذف كلمة محظورة ──
        case 'delbadword': {
            if (!text) { await reply('❌ أرسل الكلمة.'); break; }
            const idx4 = DB.settings.badWords?.indexOf(text.toLowerCase());
            if (idx4 === -1 || idx4 === undefined) { await reply('⚠️ هذه الكلمة غير موجودة.'); break; }
            DB.settings.badWords.splice(idx4, 1);
            global.saveAllDB();
            await reply(`✅ تم حذف "${text}" من قائمة الكلمات المحظورة.`);
            break;
        }

        // ── قائمة الكلمات المحظورة ──
        case 'badwordlist': {
            if (!DB.settings.badWords || DB.settings.badWords.length === 0) {
                await reply('لا توجد كلمات محظورة.');
                break;
            }
            const list = DB.settings.badWords.map((w, i) => `${i + 1}. ${w}`).join('\n');
            await reply(`🔞 *الكلمات المحظورة*\n\n${list}`);
            break;
        }

        // ── وضع الطوارئ ──
        case 'emergency_on': {
            DB.settings.emergency = true;
            global.saveAllDB();
            await reply('🚨 تم تفعيل وضع الطوارئ!\nلن يستطيع أحد استخدام البوت سوى المالك.');
            break;
        }

        // ── إيقاف الطوارئ ──
        case 'emergency_off': {
            DB.settings.emergency = false;
            global.saveAllDB();
            await reply('✅ تم إيقاف وضع الطوارئ. البوت يعمل بشكل طبيعي.');
            break;
        }

        // ── رسالة للمالك ──
        case 'ownermsg': {
            if (!text) { await reply('❌ أرسل نص الرسالة.'); break; }
            try {
                await sock.sendMessage(`${config.ownerNumber}@s.whatsapp.net`, {
                    text: `📩 رسالة من البوت:\n\n${text}`
                });
                await reply('✅ تم إرسال الرسالة إلى المالك.');
            } catch {
                await reply('❌ فشل الإرسال.');
            }
            break;
        }

        // ── قائمة أوامر المالك ──
        case 'helpowner': {
            await reply(`
👑 *أوامر المالك*
${config.line}

🔧 *التحكم في البوت*
• ${config.prefix}إيقاف — إيقاف البوت
• ${config.prefix}تشغيل — تشغيل البوت
• ${config.prefix}إعادة — إعادة التشغيل
• ${config.prefix}uptime — مدة التشغيل
• ${config.prefix}إحصائيات — إحصائيات البوت
• ${config.prefix}حالة السيرفر — معلومات السيرفر
• ${config.prefix}الذاكرة — استخدام الذاكرة
• ${config.prefix}نسخة — إصدار البوت

🚫 *الحظر*
• ${config.prefix}حظر @مستخدم — حظر مستخدم
• ${config.prefix}فك حظر @مستخدم — فك الحظر
• ${config.prefix}قائمة المحظورين — عرض المحظورين

⭐ *VIP*
• ${config.prefix}إضافة vip @مستخدم — إضافة VIP
• ${config.prefix}إزالة vip @مستخدم — إزالة VIP
• ${config.prefix}قائمة vip — قائمة VIP

🛡️ *المشرفون*
• ${config.prefix}إضافة مشرف @مستخدم
• ${config.prefix}إزالة مشرف @مستخدم
• ${config.prefix}قائمة المشرفين

📢 *الرسائل*
• ${config.prefix}رسالة عامة [نص] — بث لكل الجروبات

📋 *المجموعات*
• ${config.prefix}قائمة الجروبات — عرض الجروبات
• ${config.prefix}تفعيل البوت — تفعيل في الجروب
• ${config.prefix}تعطيل البوت — تعطيل في الجروب
• ${config.prefix}إخراج من جروب — مغادرة الجروب

🔞 *الكلمات*
• ${config.prefix}إضافة كلمة [كلمة]
• ${config.prefix}حذف كلمة [كلمة]
• ${config.prefix}قائمة الكلمات

💾 *قاعدة البيانات*
• ${config.prefix}حفظ — حفظ البيانات
`.trim());
            break;
        }

        default:
            break;
    }
}

// دالة التأخير
function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
}

// تنسيق مدة التشغيل
function formatUptime(uptime) {
    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);
    return `${h}س ${m}د ${s}ث`;
}

module.exports = { execute };
