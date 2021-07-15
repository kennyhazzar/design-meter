const config = require('config')
const Layout = require('../model/Layout')
const Datascore = require('nedb-promise')
const chatId = config.get('chatId')
const templateDefault = require('../template/default_template.json')
const currentDefault = require('../template/current_template.json')
const defaultInlineKeyboard =
    currentDefault.inline_keyboard != undefined ?
        currentDefault.inline_keyboard :
        templateDefault.inline_keyboard

// console.log(`проверка тернарки:\n${JSON.stringify(defaultInlineKeyboard)}`)
module.exports = {
    photoHandler: async ctx => {
        if (ctx.chat.type === 'private') {
            try {
                const username = ctx.chat.username
                const db = new Datascore({ filename: 'data/message', autoload: true })
                await db.insert({
                    user: {
                        firstName: ctx.chat.first_name,
                        lastName: ctx.chat.last_name,
                        username: ctx.chat.username,
                    },
                    messageId: ctx.message.message_id,
                    chatId: ctx.chat.id,
                    username
                })
                await ctx.telegram.forwardMessage(
                    chatId,
                    ctx.chat.id,
                    ctx.message.message_id,
                    { disable_notification: true })

                await ctx.telegram.sendMessage(chatId, `Макет от @${ctx.chat.username}!\nНомер: ${ctx.message.message_id}`, {
                    reply_markup: {
                        inline_keyboard: defaultInlineKeyboard,
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