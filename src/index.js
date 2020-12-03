const TelegramBot = require('node-telegram-bot-api')
const config = require('./config')
const helper = require('./helper')
const kb = require('./keyboard-buttons')
const keyboard = require('./keyboard')
const database = require('./database')

const bot = new TelegramBot(config.TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})

helper.logStart()


bot.on('message', msg => {
    const chatID = helper.getChatId(msg)

    switch (msg.text) {
        case kb.home.main:
            bot.sendMessage(chatID, msg.text, {
                reply_markup: {keyboard: keyboard.main}
            })
            break
        case kb.home.aboutDepartment:
            bot.sendMessage(chatID, msg.text, {
                reply_markup: {keyboard: keyboard.aboutDepartment}
            })
            break
        case kb.home.forEnrollee:
            bot.sendMessage(chatID, msg.text, {
                reply_markup: {keyboard: keyboard.forEnrollee}
            })
            break
        case kb.home.learningProcess:
            bot.sendMessage(chatID, msg.text, {
                reply_markup: {keyboard: keyboard.learningProcess}
            })
            break
        case kb.home.science:
            bot.sendMessage(chatID, msg.text, {
                reply_markup: {keyboard: keyboard.science}
            })
            break
        case kb.home.contacts:
            bot.sendMessage(chatID, msg.text, {
                reply_markup: {keyboard: keyboard.contacts}
            })
            break
        case kb.main.news:
            newsHandler(chatID, database.getFromDbByKey('news'))
            break
        case kb.main.tabs:
            bot.sendMessage(chatID, msg.text, {
                reply_markup: {keyboard: keyboard.tabsWhyWe}
            })
            break
        case kb.tabsWhyWe.creative:
            tabsHandler(chatID, database.getFromDbByKey('creativeTab'))
            break
        case kb.tabsWhyWe.education:
            tabsHandler(chatID, database.getFromDbByKey('educationTab'))
            break
        case kb.tabsWhyWe.work:
            tabsHandler(chatID, database.getFromDbByKey('workTab'))
            break
        case kb.tabsWhyWe.aboutUs:
            aboutUs(chatID, database.getFromDbByKey('aboutUsTab'))
            break
        case kb.aboutDepartment.about:
            aboutDepartment(chatID, database.getFromDbByKey('aboutDepartment'))
            break
        case kb.aboutDepartment.workers:
            bot.sendMessage(chatID, msg.text, {
                reply_markup: {keyboard: keyboard.departmentsWorkers}
            })
            break
        case (kb.departmentsWorkers.poroshin):
            workersHandler(chatID, database.getFromDbByKey('workersList', "poroshin"))
            break
        case (kb.departmentsWorkers.statkus):
            workersHandler(chatID, database.getFromDbByKey('workersList', "statkus"))
            break
        case (kb.departmentsWorkers.nos):
            workersHandler(chatID, database.getFromDbByKey('workersList', "nos"))
            break
        case (kb.departmentsWorkers.usik):
            workersHandler(chatID, database.getFromDbByKey('workersList', "usik"))
            break
        case (kb.departmentsWorkers.shostak):
            workersHandler(chatID, database.getFromDbByKey('workersList', "shostak"))
            break
        case (kb.departmentsWorkers.korolova):
            workersHandler(chatID, database.getFromDbByKey('workersList', "korolova"))
            break
        case (kb.departmentsWorkers.nosyk):
            workersHandler(chatID, database.getFromDbByKey('workersList', "nosyk"))
            break
        case (kb.departmentsWorkers.onyshchenko):
            workersHandler(chatID, database.getFromDbByKey('workersList', "onyshchenko"))
            break
        case (kb.departmentsWorkers.bielikov):
            workersHandler(chatID, database.getFromDbByKey('workersList', "bielikov"))
            break
        case (kb.departmentsWorkers.kornienko):
            workersHandler(chatID, database.getFromDbByKey('workersList', "kornienko"))
            break
        case (kb.departmentsWorkers.salfetnikova):
            workersHandler(chatID, database.getFromDbByKey('workersList', "salfetnikova"))
            break
        case (kb.departmentsWorkers.fomenko):
            workersHandler(chatID, database.getFromDbByKey('workersList', "fomenko"))
            break
        case (kb.aboutDepartment.studentsWorks):
            studentWorksHandler(chatID, database.getFromDbByKey('studentWorks'))
            break
        case (kb.aboutDepartment.graduateSchool):
            graduateSchoolHandler(chatID, database.getFromDbByKey('graduateSchool'))
            break
        case (kb.aboutDepartment.graduates):
            graduatesHandler(chatID, database.getFromDbByKey('graduates'))
            break
        case (kb.forEnrollee.bachelor):
            graduateSchoolHandler(chatID, database.getFromDbByKey('forEnrollee', 'bachelor'))
            break
        case (kb.forEnrollee.mastersDegree):
            graduateSchoolHandler(chatID, database.getFromDbByKey('forEnrollee', 'mastersDegree'))
            break
        case (kb.forEnrollee.booklet):
            sendImages(chatID, database.getFromDbByKey('booklet'))
            break
        case (kb.forEnrollee.conditionsOfEntry):
            conditionsOfEntryHandler(chatID, database.getFromDbByKey('conditionsOfEntry', 'entryInformation'), database.getFromDbByKey('conditionsOfEntry', 'links'))
            break
        case (kb.learningProcess.learningSchedule):
            sendImages(chatID, database.getFromDbByKey('learningProcess', 'learningSchedule'))
            break
        case (kb.learningProcess.curriculum):
            curriculumHandler(chatID, database.getFromDbByKey('learningProcess', 'curriculum'))
            break
        case (kb.learningProcess.lessonsSchedule):
            lessonsScheduleHandler(chatID, database.getFromDbByKey('learningProcess', 'lessonsSchedule'))
            break
        case (kb.learningProcess.disciplinesPrograms):
            curriculumHandler(chatID, database.getFromDbByKey('learningProcess', 'disciplinesPrograms'))
            break
        case (kb.science.scientificDirections):
            conditionsOfEntryHandler(chatID, database.getFromDbByKey('science', 'scientificDirections'))
            break
        case (kb.contacts.contactUS):
            contactUSHandler(chatID, database.getFromDbByKey('contacts', 'contactUS'), database.getFromDbByKey('contacts', 'mapLocation'))
            break
        case (kb.contacts.webVersion):
            curriculumHandler(chatID, database.getFromDbByKey('contacts', 'webVersion'), false)
            break
        case kb.back:
            bot.sendMessage(chatID, `Головна`, {
                reply_markup: {keyboard: keyboard.home}
            })
       /* default:
            bot.sendMessage(helper.getChatId(msg), "Я - найсучасніший робот! 🤖 \nАле я ще не вивчив людської мови 😢🥺 \nОберіть один із пунктів меню або напишіть його назву.", {
                reply_markup: {
                    keyboard: keyboard.home
                }
            })
            bot.sendPhoto(chatID, 'https://naukatv.ru/upload/files/science_robot-writing_cut-photo.ru.jpg')*/
    }
})

bot.onText(/\/start/, msg => {
    const text = `Привіт, ${msg.from.first_name} ${msg.from.last_name} 👋\n Я - онлайн помічник обробки академічних даних  кафедри "МІТС" НТУ ХПІ. 🤖\n Для початку роботи - оберіть команду! ⬇️⬇️`

    bot.sendMessage(helper.getChatId(msg), text, {
        reply_markup: {
            keyboard: keyboard.home
        }
    })
})

function sendHtml(chatId, html, kbName = null, isDisablePreview = false) {
    const options = {
        parse_mode: 'HTML',
        disable_web_page_preview: isDisablePreview
    }

    if (kbName) {
        options['reply_markup'] = {
            keyboard: keyboard[kbName]
        }
    }

    bot.sendMessage(chatId, html, options)
}

function newsHandler(chatId, data) {
    if (data) {
        let html
        data.map((item) => {
            html = `<b>‼️${item.title}‼️</b> \n\n ${item.description}`
            sendHtml(chatId, html)
        })
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function tabsHandler(chatId, data) {
    if (data) {
        let html
        data.map((item) => {
            html = `<b>\uD83D\uDD38 ${item.question.header} \uD83D\uDD38</b>\n${item.question.variants.map((item) => {
                return `\uD83D\uDD3A ${item}\n`
            })}\n\n<b>\uD83D\uDD38 ${item.answer.header} \uD83D\uDD38</b>\n ${item.answer.variants.map((item) => {
                return `✅${item}\n`
            })}\n\n`
            sendHtml(chatId, html)
        })
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function aboutUs(chatId, data) {
    if (data) {
        let html
        data.map((item) => {
            html = `<b>⚠️⚠️${item.description}⚠️⚠️</b>`
            sendHtml(chatId, html)
            setTimeout(bot.sendMessage(chatId, item.video), 4000)
        })
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function aboutDepartment(chatId, data) {
    if (data) {
        let html = `<b>🔻🔻${data.header}🔻🔻\n${data.text}</b>`
        sendHtml(chatId, html)
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function workersHandler(chatId, data) {
    if (data) {
        console.log('Success')
        if (data.photo) {
            bot.sendPhoto(chatId, data.photo, {
                caption: data.name
            })
        }
        let html = `${data.name ? `<b>${data.name}</b>\n` : ''}${data.degree ? `<b>Вчений ступінь і звання:</b> ${data.degree}\n` : ''}${data.position ? `<b>Посада:</b> ${data.position}\n` : ''}${data.scientificWorks ? `<b>НАУКОВІ ПРАЦІ :</b>  ${data.scientificWorks}` : ''}\n`
        sendHtml(chatId, html)
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function studentWorksHandler(chatId, data) {
    if (data) {
        data.map((item) => {
            bot.sendMessage(chatId, item.link)
        })
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function graduateSchoolHandler(chatId, data) {
    if (data) {
        let html = `<b>🧑🏻‍🎓👩🏻‍🎓${data.header}🧑🏻‍🎓👩🏻‍🎓\n${data.description}</b>`
        sendHtml(chatId, html)
        if (data.image) {
            bot.sendPhoto(chatId, data.image)
        }
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function graduatesHandler(chatId, data) {
    if (data) {
        data.map((item) => {
            bot.sendPhoto(chatId, item.photo, {
                caption: `🔻🔻${item.name}🔻🔻\n${item.information}`
            })
        })
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function sendImages(chatId, data) {
    if (data) {
        data.map((item) => {
            let option = {}
            item.caption ? option.caption = item.caption : null
            bot.sendPhoto(chatId, item.image, option)
        })
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function sendLink(chatId, link, isHidePreview, emoji = '📎'){
    let html = `${emoji}<a href="${link.link}">${link.title}</a>${emoji}`
    sendHtml(chatId, html, null, isHidePreview)
}

function conditionsOfEntryHandler(chatId, data, links = null) {
    if (data) {
        let html = `<b>📌📌${data.header}📌📌</b>\n${data.description}`
        sendHtml(chatId, html)
        bot.sendPhoto(chatId, data.image)

        if(links){
            links.map((link) => {
                sendLink(chatId, link, true)
            })
        }
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function curriculumHandler(chatId, data, isHidePreview = true) {
    if (data) {
        data.map((link) => {
            sendLink(chatId, link, isHidePreview)
        })
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function lessonsScheduleHandler(chatId, data) {
    if (data) {
        bot.sendDocument(chatId, data)
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}

function contactUSHandler(chatId, data, map){
    if (data) {
        let html = `<b>🗺Адреса: </b>${data.address}\n<b>📞Телефон: </b>${data.phone}\n<b>📧Email: </b>${data.email}\n<b>📣YouTube: </b>${data.youtube}\n`
        sendHtml(chatId, html)

        if(map){
           bot.sendLocation(chatId, map.lat, map.lng)
        }
    } else {
        bot.sendMessage(chatId, "Інформація відсутня")
    }
}
