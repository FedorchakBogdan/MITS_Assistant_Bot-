const fs = require('fs');

let rawdata = fs.readFileSync('./database.json');
let database = JSON.parse(rawdata);

module.exports  = {
    getFromDbByKey(key, subKey = null) {
        if(subKey){
            return database[key][subKey]
        } else {
            return database[key]
        }
    }
}
