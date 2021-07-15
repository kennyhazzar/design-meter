const { Telegraf, session, Scenes: { BaseScene, Stage }, Markup } = require('telegraf')
const config = require('config')
const { photoHandler } = require('./middlewares/photo.user.middleware')
const { feedback } = require('./middlewares/actions.middleware')
const { settingScene, banScene, settingEnter, banEnter } = require('./middlewares/setting.middleware')

banScene.leave(async ctx => {
    ctx.deleteMessage(ctx.update.callback_query.message.message_id)
    ctx.scene.enter('settingScene')
})

// settingScene.leave(async ctx => {
//     await ctx.answerCbQuery('Изменения внесены')
//     await ctx.deleteMessage(ctx.update.callback_query.message.message_id)
//     await ctx.deleteMessage(ctx.session?.quit_id)
// })

settingScene.enter(ctx => settingEnter(ctx))
banScene.enter(ctx => banEnter(ctx))

settingScene.action('quit_setting', ctx => ctx.scene.leave())

const stage = new Stage([settingScene, banScene])

const bot = new Telegraf(config.get('botToken'))

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => {
    ctx.reply(`Привет! «Дизайнометр» измеряет качество дизайна по шкале «Горячо–Тепло–Холодно».\n

    Под капотом сложный неискусственный интеллект двух дизайнеров Лёши Ревы и Жоры Погребняка. При виде макета он производит сложные вычисления и за секунду выдаёт реакцию в виде одного слова. Как он работает мы сами не знаем. Какой из дизайнеров отреагирует, тоже не угадать. Но пользователи говорят, что результат оказывается довольно точным.\n 
    
    Оценки субъективны, и мы не несём ответственность за принятые вами решения после и судьбу ваших проектов.\n
    
    Пришлите макет в JPG и в ответ получите оценку.`)
})

// bot.settings(ctx => ctx.scene.enter('settingScene'))

bot.on('text', ctx => {
    if (ctx.chat.type === 'private') {
        ctx.reply('Я бы с радостью пообщался, да не для этого создан. Пришлите макет и я его оценю.')
    } else {
        console.log(ctx.update.message.chat.id)
    }
})
// ctx.update.message.document.file_name
bot.on('document', ctx => {
    if (ctx.update.message.document.file_name.split('.').pop() === 'png' ||
        ctx.update.message.document.file_name.split('.').pop() === 'PNG' ||
        ctx.update.message.document.file_name.split('.').pop() === 'jpg' ||
        ctx.update.message.document.file_name.split('.').pop() === 'JPG' ||
        ctx.update.message.document.file_name.split('.').pop() === 'JPEG' ||
        ctx.update.message.document.file_name.split('.').pop() === 'jpeg') {
        photoHandler(ctx)
    } else ctx.reply('Файл неподходящего формата, в названии файла не должно быть точек, кроме расширения - example.jpg')
})

bot.on('photo', ctx => photoHandler(ctx))

settingScene.action('ban_setting', ctx => banEnter(ctx))

bot.action('Cold', async ctx => feedback(ctx, 'cold'))
bot.action('Warm', async ctx => feedback(ctx, 'warm'))
bot.action('Hot', async ctx => feedback(ctx, 'hot'))
bot.action('Unclear', async ctx => feedback(ctx, 'unclear'))

bot.on('message', ctx => {
    if (ctx.chat.type === 'private') {
        ctx.reply('Я бы с радостью пообщался, да не для этого создан. Пришлите макет и я его оценю.')
    } else {
        console.log(ctx)
    }
})

async function start() {
    try {
        console.log(`started`)
        bot.launch()
    } catch (error) {
        console.log(`started is wrong:\n${error}`)
        process.exit(1)
    }
}

start()