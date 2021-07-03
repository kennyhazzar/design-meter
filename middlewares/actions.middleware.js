const Layout = require('../model/Layout')

module.exports = {
    cold: async ctx => {
        if (ctx.chat.type = 'private') {
            try {
                const messageId = ctx.callbackQuery.message.text.slice(ctx.callbackQuery.message.text.lastIndexOf(':') + 2)
                const chatUser = await Layout.findOne({ messageId })
                ctx.answerCbQuery('Холодно')
                ctx.editMessageText(
                    `Макет от @${chatUser.user.username} оценен как Холодно\nОценил: @${ctx.callbackQuery.from.username}
                `)

                ctx.telegram.sendMessage(chatUser.chatId, 'Холодно\\. Поработайте с вёрсткой, чтобы потеплело\\.\nПопробуйте поучаствовать [в наших спринтах](https://vk.com/lean.school)', {
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
    },
    hot: async ctx => {
        if (ctx.chat.type = 'private') {
            try {
                const messageId = ctx.callbackQuery.message.text.slice(ctx.callbackQuery.message.text.lastIndexOf(':') + 2)
                const chatUser = await Layout.findOne({ messageId })
                ctx.answerCbQuery('🔥Горячо')
                ctx.editMessageText(
                    `Макет от @${chatUser.user.username} оценен как 🔥Горячо\nОценил: @${ctx.callbackQuery.from.username}
                `)

                ctx.telegram.sendMessage(chatUser.chatId, '🔥Горячо\\.\nОтличная работа, [может познакомимся](https://leandesign.typeform.com/to/RNs61IUK)?', {
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
    },
    unclear: async ctx => {
        if (ctx.chat.type = 'private') {
            try {
                const messageId = ctx.callbackQuery.message.text.slice(ctx.callbackQuery.message.text.lastIndexOf(':') + 2)
                const chatUser = await Layout.findOne({ messageId })
                ctx.answerCbQuery('Непонятно')
                ctx.editMessageText(
                    `Что-то непонятное от @${chatUser.user.username}, отправляю ему соответствующее сообщение
                \nОценил: @${ctx.callbackQuery.from.username}
                `)

                ctx.telegram.sendMessage(chatUser.chatId,
                    'Вёрстки не обнаружено. Попробуйте другой макет. Мы отсматриваем только работы связанные с вёрсткой.', {
                    reply_to_message_id: chatUser.messageId,

                })
            } catch (error) {
                console.log(error)

            }
        } else {
            console.log(ctx)
        }
    },
    warm: async ctx => {
        if (ctx.chat.type = 'private') {
            try {
                const messageId = ctx.callbackQuery.message.text.slice(ctx.callbackQuery.message.text.lastIndexOf(':') + 2)
                const chatUser = await Layout.findOne({ messageId })
                ctx.answerCbQuery('Тепло')

                ctx.editMessageText(
                    `Макет от @${chatUser.user.username} оценен как Тепло\nОценил: @${ctx.callbackQuery.from.username}
                `)

                ctx.telegram.sendMessage(chatUser.chatId,
                    'Тепло\\. Хорошо, но пока не вау\\. Дьявол в мелочах\\. Попробуйте [поучаствовать в наших спринтах](https://vk.com/lean.school)\\.', {
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