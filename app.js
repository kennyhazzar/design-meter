const { Telegraf, session, Scenes: { BaseScene, Stage }, Markup } = require('telegraf')
const config = require('config')
const mongoose = require('mongoose')
const { photoHandler } = require('./middlewares/photo.user.middleware')
const { cold, warm, hot, unclear } = require('./middlewares/actions.middleware')
const { setting, settingScene, banScene, settingEnter, banEnter } = require('./middlewares/setting.middleware')


banScene.leave(async ctx => {
    ctx.deleteMessage(ctx.update.callback_query.message.message_id)
    ctx.scene.enter('settingScene')
})

settingScene.leave(async ctx => {
    await ctx.answerCbQuery('Изменения внесены')
    await ctx.deleteMessage(ctx.update.callback_query.message.message_id)
    await ctx.deleteMessage(ctx.session?.quit_id)
})

settingScene.enter(ctx => settingEnter(ctx))
banScene.enter(ctx => banEnter(ctx))

settingScene.action('quit_setting', ctx => ctx.scene.leave())

const stage = new Stage([settingScene, banScene])

const bot = new Telegraf(config.get('botToken'))

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => {
    ctx.reply('Привет!' +
        ' Дизайнометр поможет замерить качество дизайна. Пришли макет в JPG (пока только сжатое фото) и в ответ получишь оценку ' + '"Холодно/Тепло/Горячо"')
})

// bot.settings(ctx => ctx.scene.enter('settingScene'))

bot.on('text', ctx => {
    if (ctx.chat.type === 'private') {
        ctx.reply('Я бы с радостью пообщался, да не для этого создан. Пришлите макет и я его оценю.')
    } else {
        console.log(ctx.update.message.chat.id)
    }
})



bot.on('photo', ctx => photoHandler(ctx))

settingScene.action('ban_setting', ctx => banEnter(ctx))

bot.action('Cold', async ctx => cold(ctx))
bot.action('Warm', async ctx => warm(ctx))
bot.action('Hot', async ctx => hot(ctx))
bot.action('Unclear', async ctx => unclear(ctx))

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
        mongoose.connect(config.get('mongoUri'), {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        bot.launch()
    } catch (error) {
        console.log(`started is wrong:\n${error}`)
        process.exit(1)
    }
}

start()