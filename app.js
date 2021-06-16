const { Telegraf } = require('telegraf')

const config = require('config')

const bot = new Telegraf(config.get('botToken'))

class Chats {
    
}

bot.start(ctx => {
    ctx.reply('Привет!' +
        ' Дизайнометр поможет замерить качество дизайна. Пришли макет в JPG или PNG и в ответ получишь оценку ' + '"Холодно/Тепло/Горячо"')
})

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
            await ctx.telegram.forwardMessage( -509433476, ctx.chat.id, ctx.message.message_id,
                {
                    disable_notification: true
                })

            await ctx.telegram.sendMessage( -509433476, `Оцените макет от @${ctx.chat.username}!`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Холодно", callback_data: "Cold" }],
                        [{ text: "Тепло", callback_data: "Warm" }],
                        [{ text: "Горячо", callback_data: "Hot" }]
                    ]
                }
            })
        } catch (error) {
            console.log(error)
            ctx.reply('Какая-то ошибка у бота в коде:(')
        }
    } else {
        console.log(ctx)
    }
})

bot.action('Cold', ctx => {
    console.log(ctx.from)
    ctx.editMessageText(`Макет от @${ctx.chat.username} оценен как Холодно!\nСообщение передано!\nПроверил @${ctx.update.callback_query.from.username}`)
})

bot.action('Warm', ctx => {
    ctx.editMessageText(`Тепло!\nСообщение передано!\nПроверил @${ctx.update.callback_query.from.username}`)
})

bot.action('Hot', ctx => {
    ctx.editMessageText(`Горячо!\nСообщение передано!\nПроверил @${ctx.update.callback_query.from.username}`)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))