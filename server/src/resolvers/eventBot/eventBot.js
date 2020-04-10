var path = require('path');

var pythonScriptPath = path.join(__dirname, 'informationRetrieval.py');

function eventBotInfo(eventInfo) {
    return new Promise((resolve, reject) => {
        // Use child_process.spawn method from
        // child_process module and assign it
        // to variable spawn
        var spawn = require("child_process").spawn;

        // Parameters passed in spawn -
        // 1. python3
        // 2. list containing Path of the script (./send-email.py)
        //    and arguments for the script (link)
        var process = spawn('python3', [pythonScriptPath, eventInfo]);

        var results = "";

        process.stdout.on('data', function(data) {
            results +=data.toString();
        })

        process.on('exit', (code) => {
            console.log(`Child exited with code ${code}`);
            if(code === 0){
                resolve(JSON.parse(results))
            }
            else{
                reject(JSON.parse(results))
            }
        });

    })
}


module.exports = { eventBotInfo }