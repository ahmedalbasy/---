// ══════════════════════════════════════════════
//        إعدادات بوت ـ اﺣﻣد اﻟ۶ﺑاسيᯓ¹⁰
// ══════════════════════════════════════════════

const config = {
    // معلومات المالك
    ownerNumber: '967739020737',
    ownerName: 'ـ اﺣﻣد اﻟ۶ﺑاسيᯓ¹⁰',
    ownerLink: 'https://wa.me/967739020737',

    // معلومات البوت
    botName: 'ـ اﺣﻣد اﻟ۶ﺑاسيᯓ¹⁰',
    botVersion: '2.0.0',
    prefix: '.',
    botNumber: '',

    // مسارات الملفات
    sessionPath: './session',
    dbPath: './database',

    // إعدادات عامة
    language: 'ar',
    timezone: 'Asia/Riyadh',

    // حد التحذيرات قبل الطرد التلقائي
    maxWarnings: 3,

    // حد تكرار الرسائل
    spamLimit: 5,
    spamTime: 10000, // 10 ثوانٍ

    // رسائل النظام
    messages: {
        ownerOnly: '❌ هذا الأمر خاص بالمالك فقط.',
        adminOnly: '❌ هذا الأمر للأدمن فقط.',
        groupOnly: '❌ هذا الأمر يعمل في المجموعات فقط.',
        privateOnly: '❌ هذا الأمر يعمل في المحادثات الخاصة فقط.',
        botAdmin: '❌ يجب أن يكون البوت أدمن في المجموعة.',
        notFound: '❌ لم يتم العثور على المستخدم.',
        error: '❌ حدث خطأ أثناء تنفيذ الأمر.',
        wait: '⏳ جارٍ التنفيذ...',
        done: '✅ تم التنفيذ بنجاح.',
        banned: '🚫 أنت محظور من استخدام البوت.',
        disabled: '❌ هذا الأمر معطل حالياً.',
    },

    // نص الترحيب الافتراضي
    welcomeText: '🌟 أهلاً وسهلاً @user في مجموعة @group!\nنتمنى لك وقتاً ممتعاً معنا 🎉',

    // نص الوداع الافتراضي
    goodbyeText: '👋 وداعاً @user، نتمنى أن نراك مجدداً.',

    // إعدادات الحماية
    protection: {
        antiLink: false,
        antiBadWords: false,
        antiSpam: false,
        antiRaid: false,
        antiNsfw: false,
        antiBot: false,
        antiForward: false,
    },

    // الكلمات المحظورة الافتراضية
    badWords: ['كلمه1', 'كلمه2'],

    // زخارف وفواصل
    line: '══════════════════',
    star: '✦✦✦✦✦✦✦✦✦✦',

    // ألوان وأيقونات الحالات
    icons: {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
        loading: '⏳',
        owner: '👑',
        admin: '🛡️',
        member: '👤',
        bot: '🤖',
        lock: '🔒',
        unlock: '🔓',
        ban: '🚫',
        kick: '👢',
        add: '➕',
        remove: '➖',
        promote: '⬆️',
        demote: '⬇️',
    }
};

module.exports = config;
