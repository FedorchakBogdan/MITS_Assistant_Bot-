const kb = require('./keyboard-buttons')

module.exports = {
    home: [
        [kb.home.main, kb.home.aboutDepartment],
        [kb.home.forEnrollee, kb.home.learningProcess],
        [kb.home.science, kb.home.contacts],
    ],
    main: [
        [kb.main.news, kb.main.tabs],
        [kb.back]
    ],
    aboutDepartment: [
        [kb.aboutDepartment.about, kb.aboutDepartment.workers],
        [kb.aboutDepartment.studentsWorks, kb.aboutDepartment.graduateSchool],
        [kb.aboutDepartment.graduates],
        [kb.back]
    ],
    forEnrollee: [
        [kb.forEnrollee.bachelor, kb.forEnrollee.mastersDegree],
        [kb.forEnrollee.booklet, kb.forEnrollee.conditionsOfEntry],
        [kb.back]
    ],
    learningProcess: [
        [kb.learningProcess.learningSchedule, kb.learningProcess.curriculum],
        [kb.learningProcess.lessonsSchedule, kb.learningProcess.disciplinesPrograms],
        [kb.back]
    ],
    science: [
        [kb.science.scientificDirections],
        [kb.back]
    ],
    contacts: [
        [kb.contacts.contactUS],
        [kb.contacts.webVersion],
        [kb.back]
    ],
    tabsWhyWe: [
        [kb.tabsWhyWe.creative, kb.tabsWhyWe.education],
        [kb.tabsWhyWe.work, kb.tabsWhyWe.aboutUs],
        [kb.back]
    ],
    departmentsWorkers: [
        [kb.departmentsWorkers.poroshin, kb.departmentsWorkers.statkus],
        [kb.departmentsWorkers.nos, kb.departmentsWorkers.usik],
        [kb.departmentsWorkers.shostak, kb.departmentsWorkers.korolova],
        [kb.departmentsWorkers.nosyk, kb.departmentsWorkers.onyshchenko],
        [kb.departmentsWorkers.bielikov, kb.departmentsWorkers.kornienko],
        [kb.departmentsWorkers.salfetnikova, kb.departmentsWorkers.fomenko],
        [kb.back]
    ]
}
