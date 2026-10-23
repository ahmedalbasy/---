// ══════════════════════════════════════════════
//        أوامر المجموعات - بوت العباسي ══════════════════════════════════════════════

// قائمة أوامر المجموعات مع aliases
const groupCmds = {
    // ── طرد وإضافة ──
    'طرد': 'kick', 'كيك': 'kick', 'اخرج': 'kick', 'kick': 'kick', 'remove': 'kick',
    'إضافة': 'add', 'ضيف': 'add', 'أد': 'add', 'add': 'add',

    // ── الترقية والتخفيض ──
    'ترقية': 'promote', 'أدمن': 'promote', 'admin': 'promote', 'promote': 'promote',
    'تخفيض': 'demote', 'demote': 'demote', 'إزالة أدمن': 'demote',

    // ── القفل والفتح ──
    'قفل': 'lock', 'لوك': 'lock', 'lock': 'lock', 'اقفل': 'lock',
    'فتح': 'unlock', 'أنلوك': 'unlock', 'unlock': 'unlock', 'افتح': 'unlock',

    // ── معلومات وقوائم ──
    'الأعضاء': 'members', 'أعضاء': 'members', 'members': 'members', 'قائمة الأعضاء': 'members',
    'الإدارة': 'admins', 'admins': 'admins', 'قائمة الأدمن': 'admins', 'أدمنز': 'admins',
    'معلومات الجروب': 'groupinfo', 'groupinfo': 'groupinfo', 'جروب': 'groupinfo', 'info': 'groupinfo',
    'عدد الأعضاء': 'count', 'احصاء الجروب': 'count', 'count': 'count',

    // ── تغيير إعدادات ──
    'اسم': 'setname', 'تغيير الاسم': 'setname', 'setname': 'setname', 'اسم الجروب': 'setname',
    'وصف': 'setdesc', 'تغيير الوصف': 'setdesc', 'setdesc': 'setdesc', 'وصف الجروب': 'setdesc',

    // ── رابط الدعوة ──
    'دعوة': 'invite', 'رابط الدعوة': 'invite', 'invite': 'invite', 'لينك': 'invite',
    'إيقاف الدعوة': 'revoke', 'تغيير الرابط': 'revoke', 'revoke': 'revoke',

    // ── تاغ الجميع ──
    'تاغ الكل': 'tagall', 'منشن الكل': 'tagall', 'tagall': 'tagall', '@all': 'tagall', 'الكل': 'tagall',
    'تاغ الأدمن': 'tagadmins', 'منشن الأدمن': 'tagadmins', 'tagadmins': 'tagadmins',

    // ── الترحيب والوداع ──
    'تفعيل الترحيب': 'welcome_on', 'ترحيب': 'welcome_on', 'welcome': 'welcome_on',
    'إيقاف الترحيب': 'welcome_off', 'ترحيب-': 'welcome_off',
    'رسالة الترحيب': 'setwelcome', 'setwelcome': 'setwelcome', 'تعديل الترحيب': 'setwelcome',
    'عرض الترحيب': 'showwelcome', 'showwelcome': 'showwelcome',
    'تفعيل الوداع': 'goodbye_on', 'وداع': 'goodbye_on', 'goodbye': 'goodbye_on',
    'إيقاف الوداع': 'goodbye_off', 'وداع-': 'goodbye_off',
    'رسالة الوداع': 'setgoodbye', 'setgoodbye': 'setgoodbye',
    'عرض الوداع': 'showgoodbye', 'showgoodbye': 'showgoodbye',

    // ── معلومات العضو ──
    'معلومات العضو': 'userinfo', 'userinfo': 'userinfo', 'عضو': 'userinfo', 'whoami': 'userinfo',

    // ── نظام النقاط ──
    'نقاطي': 'mypoints', 'mypoints': 'mypoints', 'نقاط': 'mypoints',
    'المتصدرين': 'leaderboard', 'leaderboard': 'leaderboard', 'الترتيب': 'leaderboard', 'top': 'leaderboard',
    'إضافة نقاط': 'addpoints', 'addpoints': 'addpoints', 'نقاط+': 'addpoints',
    'طرح نقاط': 'removepoints', 'removepoints': 'removepoints', 'نقاط-': 'removepoints',
    'مسح النقاط': 'resetpoints', 'resetpoints': 'resetpoints',

    // ── التصويت ──
    'تصويت': 'poll', 'poll': 'poll', 'استطلاع': 'poll',

    // ── الدور والتنبيهات ──
    'الدور الصباحي': 'morningcall', 'صباح': 'morningcall', 'morningcall': 'morningcall',
    'الدور المسائي': 'eveningcall', 'مساء': 'eveningcall', 'eveningcall': 'eveningcall',

    // ── حذف الرسالة ──
    'حذف': 'delete', 'delete': 'delete', 'del': 'delete', 'مسح': 'delete',

    // ── تثبيت الرسالة ──
    'تثبيت': 'pin', 'pin': 'pin',
    'إلغاء التثبيت': 'unpin', 'unpin': 'unpin',

    // ── إعادة الضبط ──
    'إعادة ضبط': 'resetgroup', 'resetgroup': 'resetgroup',

    // ── الإحصائيات ──
    'إحصائيات الجروب': 'groupstats', 'groupstats': 'groupstats',

    // ── المساعدة ──
    'helpgroup': 'helpgroup', 'مساعدة الجروب': 'helpgroup', 'أوامر الجروب': 'helpgroup',

    // ── إسكات / رفع الإسكات ──
    'إسكات': 'mute', 'ميوت': 'mute', 'mute': 'mute', 'صمت': 'mute',
    'رفع الإسكات': 'unmute', 'إنميوت': 'unmute', 'unmute': 'unmute',
    'إسكات الكل': 'muteall', 'muteall': 'muteall',
    'رفع الإسكات عن الكل': 'unmuteall', 'unmuteall': 'unmuteall',

    // ── طرد الغير نشطين ──
    'طرد الغير نشطين': 'kickinactive', 'kickinactive': 'kickinactive', 'نشطين-': 'kickinactive',

    // ── الإعلان ──
    'إعلان': 'announce', 'announce': 'announce', 'أعلن': 'announce',

    // ── إعادة تعيين ──
    'تأهيل': 'rehab', 'مسح تحذيرات': 'clearwarngroup', 'clearwarngroup': 'clearwarngroup',
};

async function execute(ctx) {
    const { command } = ctx;
    const action = groupCmds[command];
    if (!action) return false;

    await handleGroupCmd(action, ctx);
    return true;
}

async function handleGroupCmd(action, ctx) {
    const { sock, from, text, args, reply, DB, config, isGroup, isBotAdmin, isSenderAdmin, isOwner, groupMetadata, groupAdmins, mentionedJid, msg } = ctx;

    // التحقق من أن الأمر في مجموعة
    if (!isGroup) {
        await reply(config.messages.groupOnly);
        return;
    }

    // التحقق من صلاحيات البوت والمشرف
    const needsAdmin = ['kick', 'add', 'promote', 'demote', 'lock', 'unlock', 'setname', 'setdesc', 'revoke', 'mute', 'unmute', 'muteall', 'unmuteall', 'kickinactive', 'pin', 'unpin'];
    if (needsAdmin.includes(action) && !isBotAdmin) {
        await reply(config.messages.botAdmin);
        return;
    }

    const needsSenderAdmin = ['kick', 'add', 'promote', 'demote', 'lock', 'unlock', 'setname', 'setdesc', 'revoke', 'muteall', 'unmuteall', 'kickinactive', 'tagall', 'tagadmins', 'announce', 'pin', 'unpin', 'welcome_on', 'welcome_off', 'goodbye_on', 'goodbye_off', 'setwelcome', 'setgoodbye', 'addpoints', 'removepoints', 'resetpoints'];
    if (needsSenderAdmin.includes(action) && !isSenderAdmin && !isOwner) {
        await reply(config.messages.adminOnly);
        return;
    }

    switch (action) {

        // ── طرد عضو ──
        case 'kick': {
            let targets = mentionedJid.length > 0 ? mentionedJid : [];
            if (targets.length === 0) {
                const q = msg.message?.extendedTextMessage?.contextInfo?.participant;
                if (q) targets = [q];
            }
            if (targets.length === 0) { await reply('❌ منشن العضو الذي تريد طرده.\nمثال: .طرد @عضو'); break; }
            for (const t of targets) {
                if (groupAdmins.includes(t)) { await reply(`⚠️ لا يمكن طرد المشرف @${t.split('@')[0]}`); continue; }
                try {
                    await sock.groupParticipantsUpdate(from, [t], 'remove');
                    await reply(`👢 تم طرد @${t.split('@')[0]} بنجاح.`, { mentions: [t] });
                } catch { await reply('❌ فشل الطرد.'); }
            }
            break;
        }

        // ── إضافة عضو ──
        case 'add': {
            if (!text) { await reply('❌ أرسل رقم الهاتف.\nمثال: .إضافة 966501234567'); break; }
            const num = text.replace(/[^0-9]/g, '');
            const jid = `${num}@s.whatsapp.net`;
            try {
                await sock.groupParticipantsUpdate(from, [jid], 'add');
                await reply(`✅ تم إضافة +${num} إلى المجموعة.`);
            } catch { await reply('❌ فشلت الإضافة. قد يكون الرقم غير صحيح.'); }
            break;
        }

        // ── ترقية لأدمن ──
        case 'promote': {
            const targets2 = mentionedJid.length > 0 ? mentionedJid : [];
            if (targets2.length === 0) { await reply('❌ منشن العضو.\nمثال: .ترقية @عضو'); break; }
            for (const t of targets2) {
                try {
                    await sock.groupParticipantsUpdate(from, [t], 'promote');
                    await reply(`⬆️ تمت ترقية @${t.split('@')[0]} إلى أدمن.`);
                } catch { await reply('❌ فشلت الترقية.'); }
            }
            break;
        }

        // ── تخفيض من أدمن ──
        case 'demote': {
            const targets3 = mentionedJid.length > 0 ? mentionedJid : [];
            if (targets3.length === 0) { await reply('❌ منشن الأدمن.\nمثال: .تخفيض @أدمن'); break; }
            for (const t of targets3) {
                try {
                    await sock.groupParticipantsUpdate(from, [t], 'demote');
                    await reply(`⬇️ تم تخفيض @${t.split('@')[0]} من الأدمن.`);
                } catch { await reply('❌ فشل التخفيض.'); }
            }
            break;
        }

        // ── قفل المجموعة ──
        case 'lock': {
            try {
                await sock.groupSettingUpdate(from, 'announcement');
                await reply('🔒 تم قفل المجموعة. لا يمكن إرسال رسائل إلا للأدمن.');
            } catch { await reply('❌ فشل القفل.'); }
            break;
        }

        // ── فتح المجموعة ──
        case 'unlock': {
            try {
                await sock.groupSettingUpdate(from, 'not_announcement');
                await reply('🔓 تم فتح المجموعة. يمكن للجميع الإرسال.');
            } catch { await reply('❌ فشل الفتح.'); }
            break;
        }

        // ── قائمة الأعضاء ──
        case 'members': {
            const members = groupMetadata.participants.filter(p => !p.admin);
            if (members.length === 0) { await reply('لا يوجد أعضاء عاديون.'); break; }
            const list = members.map((p, i) => `${i + 1}. +${p.id.split('@')[0]}`).join('\n');
            await reply(`👥 *أعضاء المجموعة* (${members.length})\n\n${list}`);
            break;
        }

        // ── قائمة الأدمن ──
        case 'admins': {
            const adms = groupMetadata.participants.filter(p => p.admin);
            if (adms.length === 0) { await reply('لا يوجد أدمن.'); break; }
            const list = adms.map((p, i) => `${i + 1}. ${p.admin === 'superadmin' ? '👑' : '🛡️'} +${p.id.split('@')[0]}`).join('\n');
            await reply(`🛡️ *الإدارة* (${adms.length})\n\n${list}`);
            break;
        }

        // ── معلومات الجروب ──
        case 'groupinfo': {
            const g = groupMetadata;
            const creationDate = g.creation ? new Date(g.creation * 1000).toLocaleDateString('ar-SA') : 'غير معروف';
            await reply(
                `📋 *معلومات المجموعة*\n\n` +
                `📌 الاسم: ${g.subject}\n` +
                `🆔 المعرف: ${from}\n` +
                `👥 الأعضاء: ${g.participants.length}\n` +
                `🛡️ الأدمن: ${g.participants.filter(p => p.admin).length}\n` +
                `📅 تاريخ الإنشاء: ${creationDate}\n` +
                `📝 الوصف: ${g.desc || 'لا يوجد وصف'}`
            );
            break;
        }

        // ── عدد الأعضاء ──
        case 'count': {
            const g2 = groupMetadata;
            await reply(`👥 عدد الأعضاء: *${g2.participants.length}*\n🛡️ الأدمن: *${g2.participants.filter(p => p.admin).length}*`);
            break;
        }

        // ── تغيير اسم المجموعة ──
        case 'setname': {
            if (!text) { await reply('❌ أرسل الاسم الجديد.'); break; }
            try {
                await sock.groupUpdateSubject(from, text);
                await reply(`✅ تم تغيير اسم المجموعة إلى: *${text}*`);
            } catch { await reply('❌ فشل تغيير الاسم.'); }
            break;
        }

        // ── تغيير وصف المجموعة ──
        case 'setdesc': {
            if (!text) { await reply('❌ أرسل الوصف الجديد.'); break; }
            try {
                await sock.groupUpdateDescription(from, text);
                await reply(`✅ تم تغيير وصف المجموعة.`);
            } catch { await reply('❌ فشل تغيير الوصف.'); }
            break;
        }

        // ── رابط الدعوة ──
        case 'invite': {
            try {
                const code = await sock.groupInviteCode(from);
                await reply(`🔗 *رابط الدعوة*\nhttps://chat.whatsapp.com/${code}`);
            } catch { await reply('❌ فشل الحصول على الرابط.'); }
            break;
        }

        // ── تغيير رابط الدعوة ──
        case 'revoke': {
            try {
                const newCode = await sock.groupRevokeInvite(from);
                await reply(`✅ تم تغيير رابط الدعوة.\n🔗 الرابط الجديد:\nhttps://chat.whatsapp.com/${newCode}`);
            } catch { await reply('❌ فشل تغيير الرابط.'); }
            break;
        }

        // ── تاغ الكل ──
        case 'tagall': {
            const participants = groupMetadata.participants;
            const mentions = participants.map(p => p.id);
            const msgText = (text || '📢 تنبيه للجميع!') + '\n\n' +
                participants.map(p => `@${p.id.split('@')[0]}`).join(' ');
            await sock.sendMessage(from, { text: msgText, mentions });
            break;
        }

        // ── تاغ الأدمن ──
        case 'tagadmins': {
            const adms2 = groupMetadata.participants.filter(p => p.admin);
            const mentions2 = adms2.map(p => p.id);
            const msgText2 = (text || '📢 تنبيه للإدارة!') + '\n\n' +
                adms2.map(p => `@${p.id.split('@')[0]}`).join(' ');
            await sock.sendMessage(from, { text: msgText2, mentions: mentions2 });
            break;
        }

        // ── تفعيل الترحيب ──
        case 'welcome_on': {
            if (!DB.settings.welcomeEnabled) DB.settings.welcomeEnabled = {};
            DB.settings.welcomeEnabled[from] = true;
            global.saveAllDB();
            await reply('✅ تم تفعيل رسائل الترحيب في هذه المجموعة.');
            break;
        }

        // ── إيقاف الترحيب ──
        case 'welcome_off': {
            if (!DB.settings.welcomeEnabled) DB.settings.welcomeEnabled = {};
            DB.settings.welcomeEnabled[from] = false;
            global.saveAllDB();
            await reply('🔴 تم إيقاف رسائل الترحيب.');
            break;
        }

        // ── تعديل رسالة الترحيب ──
        case 'setwelcome': {
            if (!text) { await reply('❌ أرسل رسالة الترحيب.\nاستخدم @user لذكر العضو و @group لاسم الجروب.'); break; }
            if (!DB.settings.welcomeMsg) DB.settings.welcomeMsg = {};
            DB.settings.welcomeMsg[from] = text;
            global.saveAllDB();
            await reply(`✅ تم تعديل رسالة الترحيب:\n\n${text}`);
            break;
        }

        // ── عرض رسالة الترحيب ──
        case 'showwelcome': {
            const wmsg = DB.settings.welcomeMsg?.[from] || config.welcomeText;
            await reply(`📋 *رسالة الترحيب الحالية:*\n\n${wmsg}`);
            break;
        }

        // ── تفعيل الوداع ──
        case 'goodbye_on': {
            if (!DB.settings.goodbyeEnabled) DB.settings.goodbyeEnabled = {};
            DB.settings.goodbyeEnabled[from] = true;
            global.saveAllDB();
            await reply('✅ تم تفعيل رسائل الوداع.');
            break;
        }

        // ── إيقاف الوداع ──
        case 'goodbye_off': {
            if (!DB.settings.goodbyeEnabled) DB.settings.goodbyeEnabled = {};
            DB.settings.goodbyeEnabled[from] = false;
            global.saveAllDB();
            await reply('🔴 تم إيقاف رسائل الوداع.');
            break;
        }

        // ── تعديل رسالة الوداع ──
        case 'setgoodbye': {
            if (!text) { await reply('❌ أرسل رسالة الوداع.'); break; }
            if (!DB.settings.goodbyeMsg) DB.settings.goodbyeMsg = {};
            DB.settings.goodbyeMsg[from] = text;
            global.saveAllDB();
            await reply(`✅ تم تعديل رسالة الوداع:\n\n${text}`);
            break;
        }

        // ── عرض رسالة الوداع ──
        case 'showgoodbye': {
            const gmsg = DB.settings.goodbyeMsg?.[from] || config.goodbyeText;
            await reply(`📋 *رسالة الوداع الحالية:*\n\n${gmsg}`);
            break;
        }

        // ── معلومات العضو ──
        case 'userinfo': {
            let target = mentionedJid[0] || ctx.sender;
            const participant = groupMetadata.participants.find(p => p.id === target);
            const role = !participant ? 'غير معروف' :
                participant.admin === 'superadmin' ? '👑 مالك المجموعة' :
                    participant.admin === 'admin' ? '🛡️ أدمن' : '👤 عضو';
            const num = target.split('@')[0];
            const warns = DB.warnings?.[from]?.[num] || 0;
            const pts = DB.settings.points?.[from]?.[num] || 0;
            await reply(
                `👤 *معلومات العضو*\n\n` +
                `📱 الرقم: +${num}\n` +
                `🏷️ الدور: ${role}\n` +
                `⚠️ التحذيرات: ${warns}/${config.maxWarnings}\n` +
                `⭐ النقاط: ${pts}`
            );
            break;
        }

        // ── نقاطي ──
        case 'mypoints': {
            if (!DB.settings.points) DB.settings.points = {};
            if (!DB.settings.points[from]) DB.settings.points[from] = {};
            const myNum = ctx.senderNumber;
            const myPts = DB.settings.points[from][myNum] || 0;
            await reply(`⭐ نقاطك في هذا الجروب: *${myPts}* نقطة`);
            break;
        }

        // ── لوحة المتصدرين ──
        case 'leaderboard': {
            if (!DB.settings.points?.[from]) { await reply('لا توجد نقاط بعد.'); break; }
            const pts = DB.settings.points[from];
            const sorted = Object.entries(pts).sort((a, b) => b[1] - a[1]).slice(0, 10);
            if (sorted.length === 0) { await reply('لا توجد نقاط بعد.'); break; }
            const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
            const list = sorted.map(([num, p], i) => `${medals[i]} +${num}: ${p} نقطة`).join('\n');
            await reply(`🏆 *لوحة المتصدرين*\n\n${list}`);
            break;
        }

        // ── إضافة نقاط ──
        case 'addpoints': {
            const target2 = mentionedJid[0];
            if (!target2) { await reply('❌ منشن العضو.\nمثال: .إضافة نقاط @عضو 10'); break; }
            const amount = parseInt(args[1]) || 1;
            const num2 = target2.split('@')[0];
            if (!DB.settings.points) DB.settings.points = {};
            if (!DB.settings.points[from]) DB.settings.points[from] = {};
            DB.settings.points[from][num2] = (DB.settings.points[from][num2] || 0) + amount;
            global.saveAllDB();
            await reply(`✅ تمت إضافة ${amount} نقطة لـ @${num2}\nنقاطه الإجمالية: ${DB.settings.points[from][num2]}`);
            break;
        }

        // ── طرح نقاط ──
        case 'removepoints': {
            const target3 = mentionedJid[0];
            if (!target3) { await reply('❌ منشن العضو.'); break; }
            const amount2 = parseInt(args[1]) || 1;
            const num3 = target3.split('@')[0];
            if (!DB.settings.points) DB.settings.points = {};
            if (!DB.settings.points[from]) DB.settings.points[from] = {};
            DB.settings.points[from][num3] = Math.max(0, (DB.settings.points[from][num3] || 0) - amount2);
            global.saveAllDB();
            await reply(`✅ تم طرح ${amount2} نقطة من @${num3}\nنقاطه الإجمالية: ${DB.settings.points[from][num3]}`);
            break;
        }

        // ── مسح النقاط ──
        case 'resetpoints': {
            if (!DB.settings.points) DB.settings.points = {};
            DB.settings.points[from] = {};
            global.saveAllDB();
            await reply('✅ تم مسح جميع النقاط في هذه المجموعة.');
            break;
        }

        // ── التصويت ──
        case 'poll': {
            if (!text) { await reply('❌ أرسل سؤال التصويت.\nمثال: .تصويت هل البوت رائع؟\nنعم\nلا'); break; }
            const lines = text.split('\n');
            const question = lines[0];
            const options = lines.slice(1).filter(l => l.trim());
            if (options.length < 2) { await reply('❌ يجب إضافة خيارين على الأقل.'); break; }
            try {
                await sock.sendMessage(from, {
                    poll: {
                        name: question,
                        values: options,
                        selectableCount: 1,
                    }
                });
            } catch {
                await reply(`📊 *${question}*\n\n${options.map((o, i) => `${i + 1}. ${o}`).join('\n')}`);
            }
            break;
        }

        // ── الدور الصباحي ──
        case 'morningcall': {
            const participants4 = groupMetadata.participants;
            const mentions4 = participants4.map(p => p.id);
            const morningMsg = `🌅 *صباح الخير يا أهل المجموعة!*\n\n` +
                `نتمنى لكم يوماً مليئاً بالنجاح والسعادة ☀️\n\n` +
                participants4.map(p => `@${p.id.split('@')[0]}`).join(' ');
            await sock.sendMessage(from, { text: morningMsg, mentions: mentions4 });
            break;
        }

        // ── الدور المسائي ──
        case 'eveningcall': {
            const participants5 = groupMetadata.participants;
            const mentions5 = participants5.map(p => p.id);
            const eveningMsg = `🌆 *مساء الخير يا أهل المجموعة!*\n\n` +
                `نتمنى لكم مساءً هادئاً ومريحاً 🌙\n\n` +
                participants5.map(p => `@${p.id.split('@')[0]}`).join(' ');
            await sock.sendMessage(from, { text: eveningMsg, mentions: mentions5 });
            break;
        }

        // ── حذف رسالة ──
        case 'delete': {
            const q2 = msg.message?.extendedTextMessage?.contextInfo;
            if (!q2?.stanzaId) { await reply('❌ رد على الرسالة التي تريد حذفها.'); break; }
            try {
                await sock.sendMessage(from, {
                    delete: {
                        remoteJid: from,
                        fromMe: false,
                        id: q2.stanzaId,
                        participant: q2.participant,
                    }
                });
                await ctx.react('✅');
            } catch { await reply('❌ لا يمكن حذف هذه الرسالة.'); }
            break;
        }

        // ── تثبيت رسالة ──
        case 'pin': {
            const q3 = msg.message?.extendedTextMessage?.contextInfo;
            if (!q3?.stanzaId) { await reply('❌ رد على الرسالة التي تريد تثبيتها.'); break; }
            try {
                await sock.sendMessage(from, {
                    pin: { messageId: q3.stanzaId, type: 1 }
                });
                await reply('📌 تم تثبيت الرسالة.');
            } catch { await reply('❌ فشل التثبيت.'); }
            break;
        }

        // ── إلغاء التثبيت ──
        case 'unpin': {
            try {
                await sock.sendMessage(from, { pin: { messageId: '0', type: 2 } });
                await reply('📌 تم إلغاء التثبيت.');
            } catch { await reply('❌ فشل إلغاء التثبيت.'); }
            break;
        }

        // ── إسكات عضو ──
        case 'mute': {
            await reply('⚠️ الإسكات الفردي غير مدعوم حالياً.\nاستخدم .قفل لإسكات الجميع.');
            break;
        }

        // ── إسكات الكل ──
        case 'muteall': {
            try {
                await sock.groupSettingUpdate(from, 'announcement');
                await reply('🔇 تم إسكات المجموعة.');
            } catch { await reply('❌ فشل الإسكات.'); }
            break;
        }

        // ── رفع الإسكات عن الكل ──
        case 'unmuteall': {
            try {
                await sock.groupSettingUpdate(from, 'not_announcement');
                await reply('🔊 تم رفع الإسكات عن المجموعة.');
            } catch { await reply('❌ فشل رفع الإسكات.'); }
            break;
        }

        // ── طرد الغير نشطين ──
        case 'kickinactive': {
            await reply('⏳ جارٍ مسح الأعضاء غير النشطين...\n\n⚠️ هذه الميزة تتطلب تتبعاً مسبقاً للنشاط.');
            break;
        }

        // ── إعلان ──
        case 'announce': {
            if (!text) { await reply('❌ أرسل نص الإعلان.'); break; }
            const participants6 = groupMetadata.participants;
            const mentions6 = participants6.map(p => p.id);
            await sock.sendMessage(from, {
                text: `📢 *إعلان للمجموعة*\n\n${text}\n\n${participants6.map(p => `@${p.id.split('@')[0]}`).join(' ')}`,
                mentions: mentions6,
            });
            break;
        }

        // ── إحصائيات الجروب ──
        case 'groupstats': {
            const g3 = groupMetadata;
            await reply(
                `📊 *إحصائيات المجموعة*\n\n` +
                `📌 الاسم: ${g3.subject}\n` +
                `👥 الأعضاء: ${g3.participants.length}\n` +
                `🛡️ الأدمن: ${g3.participants.filter(p => p.admin).length}\n` +
                `👤 الأعضاء العاديون: ${g3.participants.filter(p => !p.admin).length}\n` +
                `🚫 المحظورون محلياً: ${DB.settings.localBanned?.[from]?.length || 0}\n` +
                `⚠️ التحذيرات: ${Object.keys(DB.warnings?.[from] || {}).length} عضو لديه تحذيرات\n` +
                `⭐ النقاط: ${Object.keys(DB.settings.points?.[from] || {}).length} عضو لديه نقاط`
            );
            break;
        }

        // ── إعادة ضبط إعدادات الجروب ──
        case 'resetgroup': {
            if (DB.settings.welcomeEnabled) delete DB.settings.welcomeEnabled[from];
            if (DB.settings.goodbyeEnabled) delete DB.settings.goodbyeEnabled[from];
            if (DB.settings.antilink) delete DB.settings.antilink[from];
            if (DB.settings.antibadwords) delete DB.settings.antibadwords[from];
            if (DB.settings.antispam) delete DB.settings.antispam[from];
            if (DB.settings.points) delete DB.settings.points[from];
            if (DB.warnings) delete DB.warnings[from];
            global.saveAllDB();
            await reply('✅ تم إعادة ضبط إعدادات المجموعة.');
            break;
        }

        // ── مسح تحذيرات جروب ──
        case 'clearwarngroup': {
            if (DB.warnings) DB.warnings[from] = {};
            global.saveAllDB();
            await reply('✅ تم مسح جميع التحذيرات في هذه المجموعة.');
            break;
        }

        // ── قائمة أوامر الجروب ──
        case 'helpgroup': {
            await reply(`
🛡️ *أوامر المجموعات*
${config.line}

👤 *إدارة الأعضاء*
• ${config.prefix}طرد @عضو — طرد عضو
• ${config.prefix}إضافة [رقم] — إضافة عضو
• ${config.prefix}ترقية @عضو — رفع لأدمن
• ${config.prefix}تخفيض @عضو — إزالة من الأدمن

🔧 *إعدادات المجموعة*
• ${config.prefix}قفل — قفل المجموعة
• ${config.prefix}فتح — فتح المجموعة
• ${config.prefix}اسم [اسم] — تغيير الاسم
• ${config.prefix}وصف [وصف] — تغيير الوصف
• ${config.prefix}دعوة — رابط الدعوة
• ${config.prefix}إيقاف الدعوة — تغيير الرابط

📢 *التنبيهات*
• ${config.prefix}تاغ الكل [رسالة]
• ${config.prefix}تاغ الأدمن [رسالة]
• ${config.prefix}إعلان [نص]
• ${config.prefix}الدور الصباحي
• ${config.prefix}الدور المسائي

👋 *الترحيب والوداع*
• ${config.prefix}تفعيل الترحيب
• ${config.prefix}إيقاف الترحيب
• ${config.prefix}رسالة الترحيب [رسالة]
• ${config.prefix}تفعيل الوداع
• ${config.prefix}إيقاف الوداع

📊 *النقاط*
• ${config.prefix}نقاطي — نقاطك
• ${config.prefix}المتصدرين — أفضل 10
• ${config.prefix}إضافة نقاط @عضو [عدد]
• ${config.prefix}طرح نقاط @عضو [عدد]

ℹ️ *معلومات*
• ${config.prefix}الأعضاء — قائمة الأعضاء
• ${config.prefix}الإدارة — قائمة الأدمن
• ${config.prefix}معلومات الجروب
• ${config.prefix}معلومات العضو @عضو
`.trim());
            break;
        }

        default:
            break;
    }
}

module.exports = { execute };
