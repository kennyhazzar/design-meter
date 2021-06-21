const { Telegraf } = require('telegraf')
const config = require('config')
const mongoose = require('mongoose')

const bot = new Telegraf(config.get('botToken'))

bot.start(ctx => { ctx.reply('Привет! Ты меня запустил:)') })

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        bot.launch()
        console.log("I'm started")
    } catch (error) {
        console.log(`Connection is wrong:\n${error}`)
    }
}

start()