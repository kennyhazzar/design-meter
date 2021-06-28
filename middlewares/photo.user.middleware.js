const config = require('config')
const { Telegraf } = require("telegraf")
const bot = new Telegraf(config.get('botToken'))
const Layout = require('../model/Layout')
const chatId = config.get('chatId')
module.exports = {
    on: async ctx => {
        if (ctx.chat.type === 'private') {
            try {
                const username = ctx.chat.username
                const layout = new Layout(
                    {
                        user: {
                            firstName: ctx.chat.first_name,
                            lastName: ctx.chat.last_name,
                            username: ctx.chat.username,
                        },
                        messageId: ctx.message.message_id,
                        chatId: ctx.chat.id,
                        username
                    }

                )
                layout.save()

                await bot.telegram.forwardMessage(
                    chatId,
                    ctx.chat.id,
                    ctx.message.message_id,
                    { disable_notification: true })

                await bot.telegram.sendMessage(chatId, `Макет от @${ctx.chat.username}!\nНомер: ${ctx.message.message_id}`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "🔥Горячо", callback_data: "Hot" },
                            { text: "Тепло", callback_data: "Warm" },
                            { text: "Непонятно", callback_data: "Unclear" }],
                            [{ text: "Холодно", callback_data: "Cold" }],
                        ],
                        force_reply: true,
                    },
                })

                await ctx.reply('Спасибо! Скоро ваш макет оценят!')
            } catch (error) {
                console.log(error)
                ctx.reply('Какая-то ошибка у бота в коде:(')
            }
        } else {
            console.log(ctx)
        }
    }
}