const { Telegraf, session, Scenes: { BaseScene, Stage }, Markup } = require('telegraf')
const config = require('config')
const bot = new Telegraf(config.get('botToken'))
const BanUsers = require('../model/BanUsers.js')
module.exports = {
    settingScene: new BaseScene('settingScene'),
    banScene: new BaseScene('banScene'),
    settingEnter: async ctx => {
        if (ctx.update.message.chat.type === 'private') {
            // || ctx.update.message.from.username !== 'leshareva'
            if (ctx.update.message.from.username === 'kennyhazzar' ||
                ctx.update.message.from.username === 'leshareva') {
                ctx.session.quit_id = ctx.message.message_id

                ctx.telegram.sendMessage(
                    ctx.update.message.chat.id,
                    `Привет ${ctx.update.message.from.first_name}, какие настройки ты бы хотел изменить?`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ "text": "Приветствие", "callback_data": "start_setting" },
                                { "text": "Оценки", "callback_data": "rate_setting" },
                                { "text": "Баны", "callback_data": "ban_setting" }],
                                [{ "text": "Выйти", "callback_data": "quit_setting" }]
                            ]
                        }
                    }
                )
            } else {
                ctx.reply('Вы не являетесь администратором, чтобы вносить изменения.')
                return
            }
        }
    },
    banEnter: async ctx => {
        console.log(ctx.update.callback_query)
        if (ctx.update.callback_query.message.chat.type === 'private') {
            // || ctx.update.message.from.username !== 'leshareva'
            if (ctx.update.callback_query.from.username === 'kennyhazzar' ||
                ctx.update.callback_query.from.username === 'leshareva') {
                ctx.session.quit_id = ctx.update.callback_query.message.message_id
                // ctx.update.callback_query.message.chat.id,

                const banAlready = []

                ctx.editMessageText(
                    `Список забаненных пользователей:\n${banAlready.length === 0 ? 'Пусто' : banAlready.map(user => { return `${user}` })}`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [{ "text": "Забанить", "callback_data": "add_ban" },
                                { "text": "Разбанить", "callback_data": "add_unban" }],
                                [{ "text": "Выйти", "callback_data": "quit_setting" }]
                            ]
                        }
                    }
                )
            } else {
                ctx.reply('Вы не являетесь администратором, чтобы вносить изменения.')
                return
            }
        }
    },
    addBan: async ctx => {
        
    }
}