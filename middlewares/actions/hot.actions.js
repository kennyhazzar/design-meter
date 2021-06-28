const config = require('config')
const { Telegraf } = require("telegraf")
const bot = new Telegraf(config.get('botToken'))
const Layout = require('../../model/Layout')

module.exports = {
    hot: async ctx => {
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
                    `Макет от @${chatUser.user.username} оценен как 🔥Горячо\nОценил: @${ctx.callbackQuery.from.username}
                `)
                ctx.telegram.sendMessage(chatUser.chatId, '🔥Горячо, если вы не умеете так верстать, то может [поработаем вместе?](https://leandesign.typeform.com/to/RNs61IUK)', {
                    parse_mode: 'MarkdownV2',
                    reply_to_message_id: chatUser.messageId,
                    disable_web_page_preview: true
                })
            } catch (error) {
                console.log(error)

            }
        } else {
            console.log(ctx)
        }
    }
}