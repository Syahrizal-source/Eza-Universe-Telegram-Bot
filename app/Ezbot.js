const TelegramBot = require("node-telegram-bot-api")

class Ezbot extends TelegramBot{
    constructor(token, options) {
        super(token, options)
    }
    getSticker() {
        this.on("sticker", (data) => {
            this.sendMessage(data.from.id, data.sticker.emoji)
        })
    }
}

module.exports = Ezbot