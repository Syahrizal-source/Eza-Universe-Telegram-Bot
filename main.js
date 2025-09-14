const Ezbot = require("./app/Ezbot")
require('dotenv').config({ silent: true })

const token = process.env.TELEGRAM_TOKEN
const options = {
    polling: true
}
const ezbot = new Ezbot(token, options)
ezbot.getSticker()


// ini listening untuk stiker only saja ya
bot.on("sticker", (data) => {
    bot.sendMessage(data.from.id, data.sticker.emoji)
})

// spesifik  hanya ketika user ketik hi
bot.onText(/^!hi$/, (data)=> {
    bot.sendMessage(data.from.id, "Kenapa Sayang! 🥰")
})

// ketika user ketik !follow test,maka katamu test akan ditangkap
bot.onText(/^!follow(.+)/, (data, after)=> {
    console.log(after[1])
    bot.sendMessage(data.from.id, `katamu:${after[1]}`)
})

// fetching quotes API
bot.onText(/^!quote$/, async (data) => {
    // ambil data quotes dari internet
    const quoteEndpoint = "https://api.kanye.rest/"
    try {
    const apiCall = await fetch(quoteEndpoint)
    const {quote} = await apiCall.json()
    bot.sendMessage(data.from.id, quote)
    }catch(error) {
        console.error(error)
        bot.sendMessage(data.from.id, "maaf silahkan cari lagi..")
    }
})

bot.onText(/^!news$/, async (data) => {
    const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia"
    bot.sendMessage(data.from.id, "Mohon di tunggu.")
    try {
        const apiCall = await fetch(newsEndpoint)
        const response = await apiCall.json()
        const maxNews = 5

        for(let i = 0; i < maxNews; i++) {
            const news = response.posts[i]
            const {title, image, headline} = news
            bot.sendPhoto(data.from.id, image, {caption: `Judul: ${title} \n\nHeadline: ${headline}`})
        }
    }catch (error) {    
        console.error(error)
    }
})
