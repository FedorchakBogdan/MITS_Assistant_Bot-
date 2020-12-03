module.exports = {
    logStart() {
        console.log('Bot has been starting')
    },

    getChatId(msg) {
        return msg.chat.id
    }
}
