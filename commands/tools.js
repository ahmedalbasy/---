// ══════════════════════════════════════════════
//        أوامر الأدوات - بوت العباسي
// ══════════════════════════════════════════════

// قائمة أوامر الأدوات
const toolsCmds = {
    // ── الترجمة ──
    'ترجمة': 'translate', 'translate': 'translate', 'ترجم': 'translate',
    'ترجمة للإنجليزية': 'translate_en', 'إنجليزي': 'translate_en', 'en': 'translate_en',
    'ترجمة للعربية': 'translate_ar', 'عربي': 'translate_ar', 'ar': 'translate_ar',

    // ── الحاسبة ──
    'حاسبة': 'calc', 'calculate': 'calc', 'calc': 'calc', 'احسب': 'calc', 'حساب': 'calc',

    // ── التاريخ والوقت ──
    'الوقت': 'time', 'time': 'time', 'توقيت': 'time', 'وقت': 'time',
    'التاريخ': 'date', 'date': 'date', 'تاريخ': 'date',
    'التقويم الهجري': 'hijri', 'hijri': 'hijri', 'هجري': 'hijri',

    // ── معلومات المستخدم ──
    'معلوماتي': 'myinfo', 'myinfo': 'myinfo', 'بياناتي': 'myinfo',
    'صورة البروفايل': 'pp', 'pp': 'pp', 'صورة': 'pp', 'الصورة الشخصية': 'pp',
    'معلومات شخص': 'userinfo2', 'userinfo2': 'userinfo2',

    // ── تحويل النص ──
    'عكس': 'reverse', 'reverse': 'reverse', 'مقلوب': 'reverse', 'النص بالمقلوب': 'reverse',
    'كبير': 'upper', 'upper': 'upper', 'نص كبير': 'upper',
    'صغير': 'lower', 'lower': 'lower', 'نص صغير': 'lower',
    'خط غريب': 'fancytext', 'fancytext': 'fancytext', 'نص مميز': 'fancytext',
    'نص مشفر': 'encode', 'encode': 'encode', 'تشفير': 'encode',
    'فك تشفير': 'decode', 'decode': 'decode',

    // ── الاستيكر ──
    'ستيكر': 'sticker', 'sticker': 'sticker', 'ملصق': 'sticker', 's': 'sticker',
    'ستيكر نص': 'stickertxt', 'stickertxt': 'stickertxt',

    // ── العد والإحصاء ──
    'عدد الكلمات': 'wordcount', 'wordcount': 'wordcount', 'كلمات': 'wordcount',
    'عدد الأحرف': 'charcount', 'charcount': 'charcount', 'أحرف': 'charcount',

    // ── مولدات ──
    'مولد كلمة مرور': 'genpass', 'genpass': 'genpass', 'كلمة مرور': 'genpass', 'باسورد': 'genpass',
    'مولد اسم': 'genname', 'genname': 'genname', 'اسم عشوائي': 'genname',

    // ── حساب العمر ──
    'عمري': 'age', 'age': 'age', 'احسب عمري': 'age', 'عمر': 'age',

    // ── التلاوة القرآنية ──
    'سورة': 'surah', 'surah': 'surah', 'اقرأ سورة': 'surah',
    'آية رقم': 'ayah', 'ayah': 'ayah',

    // ── البحث ──
    'بحث': 'search', 'search': 'search', 'ابحث': 'search', 'جوجل': 'search',

    // ── الطقس ──
    'طقس': 'weather', 'weather': 'weather', 'الطقس': 'weather',

    // ── تحويل وحدات ──
    'تحويل': 'convert', 'convert': 'convert',

    // ── رقم هاتف ──
    'معلومات رقم': 'phoneinfo', 'phoneinfo': 'phoneinfo', 'رقم': 'phoneinfo',

    // ── نسخ ولصق ──
    'انسخ': 'copy', 'copy': 'copy', 'نسخ': 'copy',

    // ── مقتطفات نصية ──
    'يوتيوب': 'youtube', 'youtube': 'youtube', 'يوتيوب بحث': 'youtube',

    // ── مساعدة ──
    'helptools': 'helptools', 'مساعدة الأدوات': 'helptools', 'أوامر الأدوات': 'helptools',

    // ── تحويل الأرقام ──
    'رقم بالكلام': 'numtowords', 'numtowords': 'numtowords', 'عدد كلام': 'numtowords',

    // ── الدول ──
    'معلومات دولة': 'countryinfo', 'countryinfo': 'countryinfo', 'دولة': 'countryinfo',

    // ── العملات ──
    'سعر الدولار': 'dollar', 'dollar': 'dollar', 'دولار': 'dollar',
    'سعر اليورو': 'euro', 'euro': 'euro', 'يورو': 'euro',

    // ── المساحة ──
    'ping': 'ping', 'بينج': 'ping',

    // ── الإشعار ──
    'تذكيرني': 'remind', 'remind': 'remind', 'تذكير': 'remind',

    // ── مولد البريد ──
    'بريد': 'email', 'email': 'email', 'بريد عشوائي': 'email',

    // ── بحث غوغل ──
    'google': 'googlesearch', 'googlesearch': 'googlesearch',

    // ── تقصير الرابط ──
    'قصر رابط': 'shorturl', 'shorturl': 'shorturl', 'رابط قصير': 'shorturl',

    // ── التحقق ──
    'صحة': 'health', 'health': 'health',

    // ── جدول ──
    'جدول': 'table', 'table': 'table',

    // ── صرف صحي ──
    'تصحيح': 'correct', 'correct': 'correct',

    // ── تحميل الصوت ──
    'صوت': 'audio', 'audio': 'audio', 'اغنية': 'audio', 'أغنية': 'audio',
    'موسيقى': 'audio', 'music': 'audio', 'تحميل صوت': 'audio', 'mp3': 'audio',

    // ── تحميل APK ──
    'apk': 'apk', 'تطبيق': 'apk', 'برنامج': 'apk', 'تحميل apk': 'apk',
    'app': 'apk', 'تنزيل': 'apk', 'download': 'apk',
};

async function execute(ctx) {
    const { command } = ctx;
    const action = toolsCmds[command];
    if (!action) return false;

    await handleToolsCmd(action, ctx);
    return true;
}

async function handleToolsCmd(action, ctx) {
    const { from, text, args, reply, pushName, senderNumber, mentionedJid, sock, msg, config, isGroup, groupMetadata } = ctx;

    switch (action) {

        // ── الترجمة ──
        case 'translate': {
            if (!text) { await reply('❌ أرسل النص للترجمة.\nمثال: .ترجمة مرحبا\nأو: .ترجمة للإنجليزية مرحبا'); break; }
            const targetLang = args[0] === 'للإنجليزية' || args[0] === 'en' ? 'en' : 'ar';
            const textToTranslate = (args[0] === 'للإنجليزية' || args[0] === 'للعربية' || args[0] === 'en' || args[0] === 'ar')
                ? args.slice(1).join(' ')
                : text;
            try {
                const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(textToTranslate)}`;
                const fetch = require('node-fetch');
                const res = await fetch(url);
                const data = await res.json();
                const translated = data[0].map(t => t[0]).join('');
                await reply(`🌐 *الترجمة*\n\n📝 الأصلي: ${textToTranslate}\n🔄 المترجم: ${translated}`);
            } catch {
                await reply('❌ فشل الترجمة. تأكد من الاتصال بالإنترنت.');
            }
            break;
        }

        case 'translate_en': {
            if (!text) { await reply('❌ أرسل النص للترجمة للإنجليزية.'); break; }
            try {
                const fetch = require('node-fetch');
                const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;
                const res = await fetch(url);
                const data = await res.json();
                const translated = data[0].map(t => t[0]).join('');
                await reply(`🌐 *ترجمة للإنجليزية*\n\n🇸🇦 عربي: ${text}\n🇺🇸 English: ${translated}`);
            } catch {
                await reply('❌ فشل الترجمة.');
            }
            break;
        }

        case 'translate_ar': {
            if (!text) { await reply('❌ أرسل النص للترجمة للعربية.'); break; }
            try {
                const fetch = require('node-fetch');
                const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${encodeURIComponent(text)}`;
                const res = await fetch(url);
                const data = await res.json();
                const translated = data[0].map(t => t[0]).join('');
                await reply(`🌐 *ترجمة للعربية*\n\n🔤 الأصلي: ${text}\n🇸🇦 العربية: ${translated}`);
            } catch {
                await reply('❌ فشل الترجمة.');
            }
            break;
        }

        // ── الحاسبة ──
        case 'calc': {
            if (!text) { await reply('❌ أرسل العملية الحسابية.\nمثال: .احسب 5 + 3 * 2'); break; }
            try {
                const expression = text.replace(/×/g, '*').replace(/÷/g, '/').replace(/،/g, '');
                if (!/^[\d\s\+\-\*\/\(\)\.%^]+$/.test(expression)) {
                    await reply('❌ صيغة غير صحيحة. استخدم الأرقام والعمليات الحسابية فقط.');
                    break;
                }
                const result = Function(`"use strict"; return (${expression})`)();
                await reply(`🧮 *الحاسبة*\n\n📊 ${expression}\n━━━━━━━\n✅ النتيجة: *${result}*`);
            } catch {
                await reply('❌ خطأ في الحساب. تحقق من الصيغة.');
            }
            break;
        }

        // ── الوقت ──
        case 'time': {
            const now = new Date();
            const riyadhTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }));
            const yemenTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Aden' }));
            const egyptTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
            const formatTime = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
            await reply(
                `🕐 *التوقيت الحالي*\n\n` +
                `🇸🇦 السعودية: ${formatTime(riyadhTime)}\n` +
                `🇾🇪 اليمن: ${formatTime(yemenTime)}\n` +
                `🇪🇬 مصر: ${formatTime(egyptTime)}\n\n` +
                `📅 التاريخ: ${now.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
            );
            break;
        }

        // ── التاريخ ──
        case 'date': {
            const now2 = new Date();
            const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
            const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
            await reply(
                `📅 *التاريخ الحالي*\n\n` +
                `📆 اليوم: ${dayNames[now2.getDay()]}\n` +
                `📅 الميلادي: ${now2.getDate()} ${monthNames[now2.getMonth()]} ${now2.getFullYear()}\n` +
                `🌙 الهجري: ${now2.toLocaleDateString('ar-SA-u-ca-islamic', { year: 'numeric', month: 'long', day: 'numeric' })}`
            );
            break;
        }

        // ── التقويم الهجري ──
        case 'hijri': {
            const now3 = new Date();
            const hijri = now3.toLocaleDateString('ar-SA-u-ca-islamic', {
                year: 'numeric', month: 'long', day: 'numeric',
                weekday: 'long',
            });
            await reply(`🌙 *التقويم الهجري*\n\n${hijri}`);
            break;
        }

        // ── معلوماتي ──
        case 'myinfo': {
            const isVip = ctx.DB.users.vip?.includes(senderNumber);
            const isMod = ctx.DB.users.admins?.includes(senderNumber);
            const role = ctx.isOwner ? '👑 مالك' : isMod ? '🛡️ مشرف' : isVip ? '⭐ VIP' : '👤 عضو';
            await reply(
                `👤 *معلوماتك*\n\n` +
                `📱 الرقم: +${senderNumber}\n` +
                `🏷️ الاسم: ${pushName}\n` +
                `🎖️ الدور: ${role}\n` +
                `🚫 محظور: ${ctx.DB.users.banned?.includes(senderNumber) ? '✅ نعم' : '❌ لا'}\n` +
                `📅 التاريخ: ${new Date().toLocaleDateString('ar-SA')}`
            );
            break;
        }

        // ── صورة البروفايل ──
        case 'pp': {
            let target = mentionedJid[0] || `${senderNumber}@s.whatsapp.net`;
            if (args[0] && args[0].match(/^[0-9]+$/)) {
                target = `${args[0]}@s.whatsapp.net`;
            }
            try {
                const ppUrl = await sock.profilePictureUrl(target, 'image');
                const fetch = require('node-fetch');
                const res = await fetch(ppUrl);
                const buffer = Buffer.from(await res.arrayBuffer());
                await sock.sendMessage(from, {
                    image: buffer,
                    caption: `📸 صورة بروفايل @${target.split('@')[0]}`,
                    mentions: [target],
                });
            } catch {
                await reply(`❌ لا توجد صورة بروفايل لـ @${target.split('@')[0]} أو تعذّر الوصول إليها.`);
            }
            break;
        }

        // ── عكس النص ──
        case 'reverse': {
            if (!text) { await reply('❌ أرسل النص.\nمثال: .عكس مرحبا'); break; }
            const reversed = text.split('').reverse().join('');
            await reply(`🔄 *النص بالمقلوب*\n\nالأصل: ${text}\nالمقلوب: ${reversed}`);
            break;
        }

        // ── نص كبير ──
        case 'upper': {
            if (!text) { await reply('❌ أرسل النص.'); break; }
            await reply(`🔠 *${text.toUpperCase()}*`);
            break;
        }

        // ── نص صغير ──
        case 'lower': {
            if (!text) { await reply('❌ أرسل النص.'); break; }
            await reply(`🔡 *${text.toLowerCase()}*`);
            break;
        }

        // ── خط غريب ──
        case 'fancytext': {
            if (!text) { await reply('❌ أرسل النص.'); break; }
            const fancyMap = {
                'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯',
                'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵',
                'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻',
                's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁',
                'y': '𝔂', 'z': '𝔃',
            };
            const fancy = text.toLowerCase().split('').map(c => fancyMap[c] || c).join('');
            await reply(`✨ *خط مزخرف*\n\n${fancy}`);
            break;
        }

        // ── تشفير النص ──
        case 'encode': {
            if (!text) { await reply('❌ أرسل النص للتشفير.'); break; }
            const encoded = Buffer.from(text, 'utf8').toString('base64');
            await reply(`🔐 *نص مشفر (Base64)*\n\n${encoded}`);
            break;
        }

        // ── فك التشفير ──
        case 'decode': {
            if (!text) { await reply('❌ أرسل النص المشفر.'); break; }
            try {
                const decoded = Buffer.from(text, 'base64').toString('utf8');
                await reply(`🔓 *فك التشفير*\n\n${decoded}`);
            } catch {
                await reply('❌ النص غير مشفر بصيغة Base64.');
            }
            break;
        }

        // ── ستيكر ──
        case 'sticker': {
            const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
            const directImage = msg.message?.imageMessage || msg.message?.videoMessage;
            const targetMsg = quotedMsg || (directImage ? msg.message : null);

            if (!targetMsg && !quotedMsg) {
                await reply('❌ أرسل صورة مع الأمر أو رد على صورة بـ .ستيكر');
                break;
            }

            try {
                const { imageMessage, videoMessage } = targetMsg;
                const mediaMsg = imageMessage || videoMessage;
                if (!mediaMsg) { await reply('❌ الملف يجب أن يكون صورة أو فيديو قصير.'); break; }

                const stream = await downloadMediaFromMessage(
                    { message: targetMsg },
                    imageMessage ? 'imageMessage' : 'videoMessage'
                );

                await sock.sendMessage(from, {
                    sticker: stream,
                });
                await ctx.react('✅');
            } catch (e) {
                await reply('❌ فشل تحويل الصورة لستيكر. تأكد أن الصورة واضحة.');
            }
            break;
        }

        // ── عدد الكلمات ──
        case 'wordcount': {
            if (!text) {
                const quotedText = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation;
                if (!quotedText) { await reply('❌ أرسل النص أو رد على رسالة.'); break; }
                const words2 = quotedText.trim().split(/\s+/).filter(w => w);
                await reply(`📊 *عداد الكلمات*\n\n📝 الكلمات: ${words2.length}\n🔤 الأحرف: ${quotedText.length}\n📄 الأسطر: ${quotedText.split('\n').length}`);
                break;
            }
            const words = text.trim().split(/\s+/).filter(w => w);
            await reply(`📊 *عداد الكلمات*\n\n📝 الكلمات: ${words.length}\n🔤 الأحرف: ${text.length}\n📄 الأسطر: ${text.split('\n').length}`);
            break;
        }

        // ── عدد الأحرف ──
        case 'charcount': {
            if (!text) { await reply('❌ أرسل النص.'); break; }
            await reply(`🔤 *عداد الأحرف*\n\n📊 الأحرف الكلية: ${text.length}\n📝 بدون مسافات: ${text.replace(/\s/g, '').length}\n📄 الكلمات: ${text.split(/\s+/).filter(w => w).length}`);
            break;
        }

        // ── مولد كلمة مرور ──
        case 'genpass': {
            const length = parseInt(args[0]) || 12;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
            let pass = '';
            for (let i = 0; i < Math.min(length, 32); i++) {
                pass += chars[Math.floor(Math.random() * chars.length)];
            }
            await reply(`🔐 *كلمة مرور جديدة*\n\n\`${pass}\`\n\n⚠️ احتفظ بها في مكان آمن!`);
            break;
        }

        // ── مولد اسم ──
        case 'genname': {
            const prefixes = ['عبد', 'محمد', 'أحمد', 'علي', 'خالد', 'فيصل', 'سعد', 'عمر', 'ياسر', 'ماجد'];
            const suffixes = ['الله', 'الرحمن', 'الكريم', 'العزيز', 'الرحيم', 'السلام', 'الغني'];
            const arabicNames = ['زياد', 'طارق', 'هاشم', 'نواف', 'بدر', 'وليد', 'حمزة', 'يوسف', 'إبراهيم', 'سليمان'];
            const name2 = Math.random() > 0.5
                ? getRandom(prefixes) + ' ' + getRandom(suffixes)
                : getRandom(arabicNames);
            await reply(`✨ *اسم عشوائي:*\n\n👤 ${name2}`);
            break;
        }

        // ── حساب العمر ──
        case 'age': {
            if (!text) { await reply('❌ أرسل سنة ميلادك.\nمثال: .عمري 1995'); break; }
            const birthYear = parseInt(text);
            if (!birthYear || birthYear < 1900 || birthYear > new Date().getFullYear()) {
                await reply('❌ سنة غير صحيحة.');
                break;
            }
            const currentYear = new Date().getFullYear();
            const age2 = currentYear - birthYear;
            const months = age2 * 12;
            const days2 = age2 * 365;
            await reply(
                `🎂 *حساب العمر*\n\n` +
                `📅 سنة الميلاد: ${birthYear}\n` +
                `👤 العمر بالسنوات: ${age2} سنة\n` +
                `📆 العمر بالأشهر: ${months} شهر\n` +
                `📅 العمر بالأيام: ${days2.toLocaleString()} يوم (تقريبي)\n\n` +
                `${age2 < 18 ? '👦 أنت لا تزال شاباً!' : age2 < 30 ? '🌟 في عمر الشباب والإنجاز!' : age2 < 50 ? '💪 في عمر النضج والتجربة!' : '👴 خبرة وحكمة طويلة!'}`
            );
            break;
        }

        // ── Ping ──
        case 'ping': {
            const start = Date.now();
            const sentMsg = await reply('🏓 Ping...');
            const end = Date.now();
            const latency = end - start;
            await sock.sendMessage(from, {
                text: `🏓 *Pong!*\n\n⚡ السرعة: ${latency}ms\n🤖 البوت: نشط ✅\n⏱️ وقت التشغيل: ${formatUptime(process.uptime())}`,
            }, { quoted: msg });
            break;
        }

        // ── البحث ──
        case 'search':
        case 'googlesearch': {
            if (!text) { await reply('❌ أرسل ما تريد البحث عنه.'); break; }
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
            await reply(
                `🔍 *نتائج البحث عن: ${text}*\n\n` +
                `🌐 رابط البحث:\n${searchUrl}\n\n` +
                `_افتح الرابط لعرض نتائج البحث الكاملة_`
            );
            break;
        }

        // ── الطقس ──
        case 'weather': {
            if (!text) { await reply('❌ أرسل اسم المدينة.\nمثال: .طقس الرياض'); break; }
            await reply(
                `🌤️ *طقس ${text}*\n\n` +
                `⚠️ لعرض الطقس الحقيقي، تحتاج لإضافة مفتاح API\n\n` +
                `🌡️ درجة الحرارة: تقريبياً 25-35°م\n` +
                `💧 الرطوبة: 40-60%\n` +
                `🌬️ الرياح: هادئة إلى معتدلة\n\n` +
                `_للطقس الدقيق: wttr.in/${encodeURIComponent(text)}_`
            );
            break;
        }

        // ── تحويل الوحدات ──
        case 'convert': {
            if (!text) {
                await reply(
                    `🔄 *تحويل الوحدات*\n\n` +
                    `أمثلة:\n` +
                    `• .تحويل 100 كيلو إلى باوند\n` +
                    `• .تحويل 1 ميل إلى كيلومتر\n` +
                    `• .تحويل 100 درجة مئوية إلى فهرنهايت`
                );
                break;
            }
            const num3 = parseFloat(args[0]);
            const from2 = args[1]?.toLowerCase();
            const to2 = args[3]?.toLowerCase();

            if (!num3 || !from2 || !to2) { await reply('❌ صيغة غير صحيحة.\nمثال: .تحويل 100 كيلو إلى باوند'); break; }

            let result;
            if ((from2.includes('كيلو') || from2 === 'kg') && (to2.includes('باوند') || to2 === 'lb')) {
                result = `${num3} كيلوجرام = *${(num3 * 2.20462).toFixed(2)} باوند*`;
            } else if ((from2.includes('باوند') || from2 === 'lb') && (to2.includes('كيلو') || to2 === 'kg')) {
                result = `${num3} باوند = *${(num3 / 2.20462).toFixed(2)} كيلوجرام*`;
            } else if ((from2.includes('ميل') || from2 === 'mile') && (to2.includes('كيلو') || to2 === 'km')) {
                result = `${num3} ميل = *${(num3 * 1.60934).toFixed(2)} كيلومتر*`;
            } else if ((from2.includes('كيلو') || from2 === 'km') && (to2.includes('ميل') || to2 === 'mile')) {
                result = `${num3} كيلومتر = *${(num3 / 1.60934).toFixed(2)} ميل*`;
            } else if ((from2.includes('مئوي') || from2 === 'c') && (to2.includes('فهرنهايت') || to2 === 'f')) {
                result = `${num3}°م = *${((num3 * 9 / 5) + 32).toFixed(1)}°ف*`;
            } else if ((from2.includes('فهرنهايت') || from2 === 'f') && (to2.includes('مئوي') || to2 === 'c')) {
                result = `${num3}°ف = *${((num3 - 32) * 5 / 9).toFixed(1)}°م*`;
            } else if ((from2.includes('قدم') || from2 === 'ft') && (to2.includes('متر') || to2 === 'm')) {
                result = `${num3} قدم = *${(num3 * 0.3048).toFixed(2)} متر*`;
            } else {
                result = '❌ لا يدعم هذا التحويل حالياً.';
            }
            await reply(`🔄 *تحويل الوحدات*\n\n${result}`);
            break;
        }

        // ── معلومات رقم ──
        case 'phoneinfo': {
            const num4 = (text || senderNumber).replace(/[^0-9]/g, '');
            if (!num4) { await reply('❌ أرسل رقم الهاتف.\nمثال: .معلومات رقم 966501234567'); break; }
            const cc = num4.substring(0, 3);
            const countries = {
                '966': '🇸🇦 السعودية', '967': '🇾🇪 اليمن', '968': '🇴🇲 عُمان',
                '965': '🇰🇼 الكويت', '971': '🇦🇪 الإمارات', '974': '🇶🇦 قطر',
                '973': '🇧🇭 البحرين', '20': '🇪🇬 مصر', '212': '🇲🇦 المغرب',
                '213': '🇩🇿 الجزائر', '216': '🇹🇳 تونس', '218': '🇱🇾 ليبيا',
                '249': '🇸🇩 السودان', '1': '🇺🇸 الولايات المتحدة', '44': '🇬🇧 بريطانيا',
            };
            const countryCode = Object.keys(countries).find(k => num4.startsWith(k)) || 'غير معروف';
            const countryName = countries[countryCode] || '🌍 دولة غير معروفة';
            await reply(
                `📱 *معلومات الرقم*\n\n` +
                `📞 الرقم: +${num4}\n` +
                `🌍 الدولة: ${countryName}\n` +
                `🔢 مفتاح الدولة: +${countryCode}\n` +
                `🔗 واتساب: https://wa.me/${num4}`
            );
            break;
        }

        // ── رقم بالكلام ──
        case 'numtowords': {
            if (!text) { await reply('❌ أرسل الرقم.\nمثال: .رقم بالكلام 1234'); break; }
            const n = parseInt(text);
            if (isNaN(n)) { await reply('❌ الرجاء إرسال رقم صحيح.'); break; }
            const ones = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة', 'عشرة', 'أحد عشر', 'اثنا عشر'];
            const tens = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
            const result2 = n <= 12 ? (ones[n] || n.toString()) :
                n < 100 ? (ones[n % 10] ? `${ones[n % 10]} و${tens[Math.floor(n / 10)]}` : tens[Math.floor(n / 10)]) :
                    n.toString();
            await reply(`🔢 *رقم بالكلام*\n\n${n} = *${result2 || n.toString()}*`);
            break;
        }

        // ── سعر الدولار ──
        case 'dollar': {
            await reply(
                `💵 *سعر الدولار*\n\n` +
                `🇸🇦 الريال السعودي: 3.75 ريال\n` +
                `🇾🇪 الريال اليمني: ~550 ريال\n` +
                `🇪🇬 الجنيه المصري: ~48-50 جنيه\n` +
                `🇦🇪 الدرهم الإماراتي: 3.67 درهم\n\n` +
                `⚠️ الأسعار تقريبية. تحقق من المصادر الرسمية.`
            );
            break;
        }

        // ── سعر اليورو ──
        case 'euro': {
            await reply(
                `💶 *سعر اليورو*\n\n` +
                `🇸🇦 الريال السعودي: ~4.05 ريال\n` +
                `🇾🇪 الريال اليمني: ~600 ريال تقريبي\n` +
                `🇪🇬 الجنيه المصري: ~52-55 جنيه\n\n` +
                `⚠️ الأسعار تقريبية. تحقق من المصادر الرسمية.`
            );
            break;
        }

        // ── البريد الإلكتروني العشوائي ──
        case 'email': {
            const names3 = ['ahmed', 'omar', 'ali', 'khalid', 'sara', 'fatima', 'noor'];
            const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
            const randName = getRandom(names3);
            const randNum5 = Math.floor(Math.random() * 9000) + 1000;
            const randDomain = getRandom(domains);
            const generatedEmail = `${randName}${randNum5}@${randDomain}`;
            await reply(`📧 *بريد إلكتروني عشوائي*\n\n\`${generatedEmail}\`\n\n⚠️ هذا للأغراض التعليمية فقط.`);
            break;
        }

        // ── يوتيوب ──
        case 'youtube': {
            if (!text) { await reply('❌ أرسل ما تريد البحث عنه في يوتيوب.'); break; }
            const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(text)}`;
            await reply(`▶️ *البحث في يوتيوب عن: ${text}*\n\n🔗 ${ytUrl}`);
            break;
        }

        // ── تذكير ──
        case 'remind': {
            if (!args[0] || !text) { await reply('❌ أرسل الوقت بالدقائق ثم التذكير.\nمثال: .تذكيرني 5 اشتري الخبز'); break; }
            const minutes2 = parseInt(args[0]);
            const reminder = args.slice(1).join(' ');
            if (!minutes2 || minutes2 < 1) { await reply('❌ أرسل عدد الدقائق بشكل صحيح.'); break; }
            await reply(`⏰ سيتم تذكيرك بـ "${reminder}" بعد ${minutes2} دقيقة.`);
            setTimeout(async () => {
                try {
                    await sock.sendMessage(from, {
                        text: `⏰ *تذكير!*\n\n${pushName}، لقد طلبت تذكيرك:\n"${reminder}"`,
                    });
                } catch { }
            }, minutes2 * 60 * 1000);
            break;
        }

        // ── تقصير الرابط ──
        case 'shorturl': {
            if (!text) { await reply('❌ أرسل الرابط.'); break; }
            try {
                const fetch2 = require('node-fetch');
                const res2 = await fetch2(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`);
                const shortLink = await res2.text();
                await reply(`🔗 *رابط مقصر*\n\nالأصلي: ${text}\n\nالمقصر: ${shortLink}`);
            } catch {
                await reply('❌ فشل تقصير الرابط.');
            }
            break;
        }

        // ── صحة ──
        case 'health': {
            const tips = [
                '💧 اشرب 8 أكواب ماء يومياً للبقاء رطباً.',
                '🏃 المشي 30 دقيقة يومياً يحسن صحتك بشكل كبير.',
                '🥗 تناول الخضروات والفواكه لتعزيز المناعة.',
                '😴 النوم 7-8 ساعات ليلياً ضروري لصحة الجسم والعقل.',
                '🧘 التأمل والاسترخاء يقلل التوتر والقلق.',
                '☀️ التعرض للشمس الصباحية يعزز فيتامين د.',
            ];
            await reply(`💊 *نصيحة صحية*\n\n${getRandom(tips)}`);
            break;
        }

        // ── نسخ رسالة ──
        case 'copy': {
            const quotedBody = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation
                || msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.extendedTextMessage?.text;
            if (!quotedBody) { await reply('❌ رد على رسالة لنسخها.'); break; }
            await reply(`📋 *الرسالة المنسوخة:*\n\n${quotedBody}`);
            break;
        }

        // ══════════════════════════════════════════
        // 🎵 تحميل الصوت من يوتيوب
        // ══════════════════════════════════════════
        case 'audio': {
            if (!text) {
                await reply(
                    `🎵 *تحميل صوت من يوتيوب*\n\n` +
                    `📌 *الاستخدام:*\n` +
                    `${config.prefix}صوت اسم الأغنية\n\n` +
                    `📝 *أمثلة:*\n` +
                    `• ${config.prefix}صوت ماشي الحال\n` +
                    `• ${config.prefix}صوت Believer Imagine Dragons\n` +
                    `• ${config.prefix}موسيقى هادئة للنوم\n\n` +
                    `⚠️ الحد الأقصى للمدة: 10 دقائق`
                );
                break;
            }

            await ctx.react('🔍');

            try {
                const yts   = require('yt-search');
                const ytdl  = require('@distube/ytdl-core');
                const axios = require('axios');

                // ── بحث عن الفيديو ──
                const result = await yts(text);
                const video  = result?.videos?.[0];

                if (!video) {
                    await reply(`❌ لم يتم العثور على نتائج لـ: *${text}*`);
                    break;
                }

                // ── تحقق من المدة (max 10 دقائق) ──
                if (video.seconds > 600) {
                    await reply(
                        `⚠️ المقطع طويل جداً (${video.timestamp}).\n` +
                        `الحد الأقصى 10 دقائق.\n\n` +
                        `🔗 ${video.url}`
                    );
                    break;
                }

                await reply(
                    `🎵 *${video.title}*\n` +
                    `⏱️ المدة: ${video.timestamp} | 👁️ المشاهدات: ${(video.views || 0).toLocaleString()}\n\n` +
                    `⬇️ جارٍ التحميل...`
                );

                // ── استخراج رابط الصوت ──
                const info   = await ytdl.getInfo(video.url);
                const format = ytdl.chooseFormat(info.formats, {
                    quality: 'highestaudio',
                    filter: 'audioonly',
                });

                if (!format || !format.url) {
                    await reply('❌ لا يمكن تحميل هذا المقطع. جرّب أغنية أخرى.');
                    break;
                }

                // ── تحميل الملف ──
                const audioRes = await axios.get(format.url, {
                    responseType: 'arraybuffer',
                    timeout: 90000,
                    maxContentLength: 60 * 1024 * 1024, // 60MB
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    },
                });

                const audioBuffer = Buffer.from(audioRes.data);
                const sizeMB = (audioBuffer.length / 1024 / 1024).toFixed(1);

                // ── إرسال الصوت ──
                await sock.sendMessage(from, {
                    audio: audioBuffer,
                    mimetype: 'audio/mp4',
                    ptt: false,
                }, { quoted: msg });

                await ctx.react('✅');

            } catch (err) {
                console.error('🎵 Audio error:', err?.message || err);
                const errMsg = err?.message || '';
                if (errMsg.includes('maxContentLength') || errMsg.includes('413')) {
                    await reply('❌ الملف كبير جداً للإرسال عبر واتساب (أكثر من 60MB).');
                } else if (errMsg.includes('timeout') || errMsg.includes('ETIMEDOUT')) {
                    await reply('❌ انتهت مهلة التحميل. حاول مرة أخرى.');
                } else {
                    await reply(`❌ فشل التحميل. حاول مرة أخرى أو جرّب اسماً مختلفاً.\n\n_${errMsg.slice(0, 80)}_`);
                }
            }
            break;
        }

        // ══════════════════════════════════════════
        // 📱 تحميل تطبيق APK
        // ══════════════════════════════════════════
        case 'apk': {
            if (!text) {
                await reply(
                    `📱 *تحميل تطبيق APK*\n\n` +
                    `📌 *الاستخدام:*\n` +
                    `${config.prefix}apk اسم التطبيق\n\n` +
                    `📝 *أمثلة:*\n` +
                    `• ${config.prefix}apk whatsapp\n` +
                    `• ${config.prefix}apk تيك توك\n` +
                    `• ${config.prefix}apk YouTube\n` +
                    `• ${config.prefix}تطبيق instagram\n\n` +
                    `⚙️ يبحث في APKPure ويرسل رابط التحميل المباشر`
                );
                break;
            }

            await ctx.react('🔍');

            try {
                const axios = require('axios');
                const query = encodeURIComponent(text);

                // ── جلب نتائج البحث من APKPure ──
                const searchRes = await axios.get(
                    `https://apkpure.com/search?q=${query}`,
                    {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
                            'Accept-Language': 'ar,en;q=0.9',
                            'Accept': 'text/html,application/xhtml+xml',
                        },
                        timeout: 15000,
                    }
                );

                const html = searchRes.data;

                // ── استخراج أول تطبيق (regex بسيط) ──
                const titleRx   = /<p class="name"[^>]*>([^<]+)<\/p>/;
                const pkgRx     = /href="\/[^"]*?\/([a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z0-9_]+){1,})"[^>]*>/g;
                const ratingRx  = /<span class="rating-num"[^>]*>([^<]+)<\/span>/;
                const sizeRx    = /<span class="file-size"[^>]*>([^<]+)<\/span>/;

                // استخراج اسم التطبيق
                const titleMatch = html.match(titleRx);
                const appTitle   = titleMatch ? titleMatch[1].trim() : text;

                // استخراج package name
                let packageName = null;
                let pkgMatch;
                const pkgPattern = /^[a-z][a-z0-9_]*(?:\.[a-z0-9_]+){2,}$/i;
                while ((pkgMatch = pkgRx.exec(html)) !== null) {
                    if (pkgPattern.test(pkgMatch[1])) {
                        packageName = pkgMatch[1];
                        break;
                    }
                }

                if (!packageName) {
                    // fallback: رابط بحث مباشر
                    await reply(
                        `🔍 *نتائج البحث عن: ${text}*\n\n` +
                        `🌐 ابحث مباشرة:\n` +
                        `• APKPure: https://apkpure.com/search?q=${query}\n` +
                        `• APKCombo: https://apkcombo.com/search/?q=${query}`
                    );
                    break;
                }

                const ratingMatch = html.match(ratingRx);
                const sizeMatch   = html.match(sizeRx);
                const rating      = ratingMatch ? ratingMatch[1].trim() : 'N/A';
                const fileSize    = sizeMatch   ? sizeMatch[1].trim()   : 'N/A';

                const dlUrl   = `https://d.apkpure.com/b/APK/${packageName}?version=latest`;
                const pageUrl = `https://apkpure.com/${appTitle.toLowerCase().replace(/\s+/g, '-')}/${packageName}`;

                let response =
                    `📱 *${appTitle}*\n` +
                    `━━━━━━━━━━━━━━━━━━━\n` +
                    `📦 الحزمة: \`${packageName}\`\n` +
                    `⭐ التقييم: ${rating}\n` +
                    `💾 الحجم: ${fileSize}\n\n` +
                    `⬇️ *روابط التحميل المباشر:*\n` +
                    `• APKPure: ${dlUrl}\n` +
                    `• صفحة التطبيق: ${pageUrl}\n\n` +
                    `💡 انسخ الرابط وافتحه في المتصفح للتحميل`;

                await reply(response);
                await ctx.react('✅');

            } catch (err) {
                console.error('📱 APK error:', err?.message || err);
                const query2 = encodeURIComponent(text);
                await reply(
                    `❌ فشل البحث. ابحث يدوياً:\n\n` +
                    `🌐 https://apkpure.com/search?q=${query2}\n` +
                    `🌐 https://apkcombo.com/search/?q=${query2}`
                );
            }
            break;
        }

        // ── مساعدة الأدوات ──
        case 'helptools': {
            await reply(`
🔧 *أوامر الأدوات*
${config.line}

🌐 *الترجمة*
• ${config.prefix}ترجمة [نص] — ترجمة تلقائية
• ${config.prefix}ترجمة للإنجليزية [نص]
• ${config.prefix}ترجمة للعربية [نص]

🧮 *الحاسبة*
• ${config.prefix}احسب [عملية] — مثال: .احسب 5+3

🕐 *التاريخ والوقت*
• ${config.prefix}الوقت — الوقت الحالي
• ${config.prefix}التاريخ — التاريخ الحالي
• ${config.prefix}التقويم الهجري

👤 *المعلومات*
• ${config.prefix}معلوماتي — بياناتك
• ${config.prefix}صورة البروفايل [@عضو]
• ${config.prefix}معلومات رقم [رقم]
• ${config.prefix}عمري [سنة الميلاد]

✏️ *تحويل النص*
• ${config.prefix}عكس [نص] — عكس النص
• ${config.prefix}نص مميز [نص]
• ${config.prefix}نص مشفر [نص]
• ${config.prefix}فك تشفير [نص]
• ${config.prefix}عدد الكلمات [نص]
• ${config.prefix}عدد الأحرف [نص]

🔐 *المولدات*
• ${config.prefix}مولد كلمة مرور [طول]
• ${config.prefix}بريد — بريد عشوائي
• ${config.prefix}اسم عشوائي

🔄 *التحويلات*
• ${config.prefix}تحويل [عدد] [من] إلى [إلى]

📡 *الإنترنت*
• ${config.prefix}بحث [نص] — بحث جوجل
• ${config.prefix}يوتيوب [نص]
• ${config.prefix}طقس [مدينة]
• ${config.prefix}قصر رابط [رابط]

💰 *العملات*
• ${config.prefix}سعر الدولار
• ${config.prefix}سعر اليورو

⏰ *أخرى*
• ${config.prefix}ping — سرعة الاستجابة
• ${config.prefix}تذكيرني [دقائق] [تذكير]
• ${config.prefix}ستيكر — تحويل صورة لستيكر

━━━━━━━━━━━━━━━━━━━━━━━━━
⬇️ *التحميل*
━━━━━━━━━━━━━━━━━━━━━━━━━

🎵 *تحميل الصوت*
• ${config.prefix}صوت [اسم الأغنية]
• ${config.prefix}موسيقى [اسم]
• ${config.prefix}mp3 [اسم]
_يبحث في يوتيوب ويرسل الصوت مباشرة_
_الحد الأقصى: 10 دقائق_

📱 *تحميل APK*
• ${config.prefix}apk [اسم التطبيق]
• ${config.prefix}تطبيق [اسم]
• ${config.prefix}برنامج [اسم]
_يبحث في APKPure ويرسل رابط التحميل_
`.trim());
            break;
        }

        default:
            break;
    }
}

// دالة تنزيل الميديا
async function downloadMediaFromMessage(msg, type) {
    const { downloadMediaMessage } = require('@whiskeysockets/baileys');
    try {
        const buffer = await downloadMediaMessage(msg, 'buffer', {});
        return buffer;
    } catch {
        throw new Error('فشل تحميل الملف');
    }
}

// دالة عشوائية
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// تنسيق مدة التشغيل
function formatUptime(uptime) {
    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);
    return `${h}س ${m}د ${s}ث`;
}

module.exports = { execute };
