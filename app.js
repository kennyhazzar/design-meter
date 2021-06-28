const { Telegraf } = require('telegraf')
const config = require('config')
const mongoose = require('mongoose')
const Layout = require('./model/Layout.js')
const bot = new Telegraf(config.get('botToken'))
const photo = require('./middlewares/photo.user.middleware')
const {cold, warm, hot, unclear} = require('./middlewares/actions.middleware')

bot.start(ctx => {
    ctx.reply('Привет!' +
        'Дизайнометр поможет замерить качество дизайна. Пришли макет в JPG (пока только сжатое фото) и в ответ получишь оценку ' + '"Холодно/Тепло/Горячо"')
})

bot.on('text', ctx => {
    if (ctx.chat.type === 'private') {
        ctx.reply('Я бы с радостью пообщался, да не для этого создан. Пришлите макет и я его оценю.')
    } else {
        console.log(ctx)
    }
})


bot.on('photo', ctx => photo.on(ctx))

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

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))