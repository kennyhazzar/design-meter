const Datastore = require('nedb-promise')

module.exports = {
    feedback: async (ctx, action_markup = 'unclear') => {
        if (ctx.chat.type = 'private') {
            try {
                const db = new Datastore({ filename: 'data/message', autoload: true })
                const messageId = ctx.callbackQuery.message.text.slice(ctx.callbackQuery.message.text.lastIndexOf(':') + 2)
                const queryChat = await db.findOne({ messageId: +messageId })
                if (action_markup == 'cold') {
                    ctx.answerCbQuery('Холодно')
                    ctx.editMessageText(
                        `Макет от @${queryChat.user.username} оценен как Холодно\nОценил: @${ctx.callbackQuery.from.username}
                    `)

                    ctx.telegram.sendMessage(queryChat.chatId, 'Холодно\\. Поработайте с вёрсткой, чтобы потеплело\\.\nПопробуйте поучаствовать [в наших спринтах](https://vk.com/lean.school)', {
                        parse_mode: 'MarkdownV2',
                        reply_to_message_id: queryChat.messageId,
                        disable_web_page_preview: true
                    })
                } else if (action_markup == 'warm') {
                    ctx.answerCbQuery('Тепло')

                    ctx.editMessageText(
                        `Макет от @${queryChat.user.username} оценен как Тепло\nОценил: @${ctx.callbackQuery.from.username}
                    `)

                    ctx.telegram.sendMessage(queryChat.chatId,
                        'Тепло\\. Хорошо, но пока не вау\\. Дьявол в мелочах\\. Попробуйте [поучаствовать в наших спринтах](https://vk.com/lean.school)\\.', {
                        parse_mode: 'MarkdownV2',
                        reply_to_message_id: queryChat.messageId,
                        disable_web_page_preview: true

                    })
                } else if (action_markup == 'hot') {
                    ctx.answerCbQuery('🔥Горячо')
                    ctx.editMessageText(
                        `Макет от @${queryChat.user.username} оценен как 🔥Горячо\nОценил: @${ctx.callbackQuery.from.username}
                    `)

                    ctx.telegram.sendMessage(queryChat.chatId, '🔥Горячо\\.\nОтличная работа, [может познакомимся](https://leandesign.typeform.com/to/RNs61IUK)?', {
                        parse_mode: 'MarkdownV2',
                        reply_to_message_id: queryChat.messageId,
                        disable_web_page_preview: true
                    })
                } else if (action_markup == 'unclear') {
                    ctx.answerCbQuery('Непонятно')
                    ctx.editMessageText(
                        `Что-то непонятное от @${queryChat.user.username}, отправляю ему соответствующее сообщение
                    \nОценил: @${ctx.callbackQuery.from.username}
                    `)

                    ctx.telegram.sendMessage(queryChat.chatId,
                        'Вёрстки не обнаружено. Попробуйте другой макет. Мы отсматриваем только работы связанные с вёрсткой.', {
                        reply_to_message_id: queryChat.messageId,

                    })
                }

            } catch (error) {
                console.log(error)

            }
        } else {
            console.log(ctx)
        }
    }
}