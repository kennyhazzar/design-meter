const { Telegraf } = require('telegraf')
const config = require('config')
const Layout = require('./model/Layout.js')
const bot = new Telegraf(config.get('botToken'))
const mongoose = require('mongoose')
const { setMaxListeners } = require('process')

bot.start(ctx => {
    ctx.reply('Привет!' +
        'Дизайнометр поможет замерить качество дизайна. Пришли макет в JPG (пока только сжатое фото) и в ответ получишь оценку ' + '"Холодно/Тепло/Горячо"')
})

// bot.use(Telegraf.log())

bot.on('text', ctx => {
    if (ctx.chat.type === 'private') {
        ctx.reply('Я бы с радостью пообщался, да не для этого создан. Пришлите макет и я его оценю.')
    } else {
        console.log(ctx)
    }
})

bot.on('photo', async ctx => {
    if (ctx.chat.type === 'private') {
        try {
            // console.log(JSON.stringify(ctx))
            console.log(ctx.chat.id)
            // const layout = new Layout({
            //     chatId: ctx.chat.id
            // })
            // await layout.save()
            await ctx.telegram.forwardMessage(
                config.get('chatId'),
                ctx.update.message.chat.id,
                ctx.update.message.message_id
            )
            console.log(ctx.chat.id)
            console.log(JSON.stringify(await ctx.telegram.getUpdates()))
            await ctx.telegram.sendMessage(config.get('chatId'), `Оцените макет от @${ctx.chat.username}!`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Холодно", callback_data: "Cold" }],
                        [{ text: "Тепло", callback_data: "Warm" }],
                        [{ text: "Горячо", callback_data: "Hot" }]
                    ],

                }
            })

            // console.log(`${JSON.stringify(ctx)}\n\n\n\n`)

            await ctx.telegram.sendMessage(ctx.chat.id, 'Спасибо! В ближайшее время мы ответим вам!')

        } catch (error) {
            console.log(error)
            ctx.reply('Какая-то ошибка у бота в коде:(')
            console.log(ctx.update.message.chat.id)
        }
    } else {
        console.log(ctx)
    }

})

bot.on('message', ctx => {
    if (ctx.chat.type === 'private') {
        ctx.reply('Я бы с радостью пообщался, да не для этого создан. Пришлите макет и я его оценю.')
    } else {
        console.log(ctx)
    }
})

bot.action('Cold', ctx => {
    // console.log(JSON.stringify(ctx))
    // ctx.telegram.getChatMember()
    ctx.editMessageText(`Макет от @${ctx.chat.username} оценен как Холодно!\nСообщение передано!\nПроверил @${ctx.update.callback_query.from.username}`)
    ctx.telegram.sendMessage(1451772580, `Твой макет оценен на Холодно:(`, {
        reply_to_message_id: 557
    })
})

bot.action('Warm', ctx => {
    ctx.editMessageText(`Тепло!\nСообщение передано!\nПроверил @${ctx.update.callback_query.from.username}`)
})

bot.action('Hot', ctx => {
    ctx.editMessageText(`Горячо!\nСообщение передано!\nПроверил @${ctx.update.callback_query.from.username}`)
})

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })
        console.log(`started`)
        bot.launch()
    } catch (error) {
        console.log(`Connection is wrong:\n${error}`)
        process.exit(1)
    }
}

start()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))