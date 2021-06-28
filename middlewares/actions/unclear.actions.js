const config = require('config')
const { Telegraf } = require("telegraf")
const bot = new Telegraf(config.get('botToken'))
const Layout = require('../../model/Layout')

module.exports = {
    unclear: async ctx => {
        if (ctx.chat.type = 'private') {
            try {
                const messageId = ctx.callbackQuery.message.text.slice(ctx.callbackQuery.message.text.lastIndexOf(':') + 2)

                /**
                    userData[0] - username (string)
                    userData[1] - messageId from user-chat (number)
                */
                const chatUser = await Layout.findOne({ messageId })
                console.log(chatUser)
                ctx.editMessageText(
                    `Что-то непонятное от @${chatUser.user.username}, отправляю ему соответствующее сообщение
                \nОценил: @${ctx.callbackQuery.from.username}
                `)
                ctx.telegram.sendMessage(chatUser.chatId,
                    'Мы ничего не можем сказать о данной работе. Мы оцениваем только макеты, связанные с вёрсткой.', {
                    reply_to_message_id: chatUser.messageId,

                })
            } catch (error) {
                console.log(error)

            }
        } else {
            console.log(ctx)
        }
    }
}