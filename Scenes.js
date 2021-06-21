const { Scenes } = require('telegraf')
class SceneGenerator {
    GenAgeScene() {
        const age = new Scenes.BaseScene('age')
        age.enter(async ctx => {
            await ctx.reply('Привет! Напиши сколько тебе лет')
        })
         
    }
}

module.exports = SceneGenerator