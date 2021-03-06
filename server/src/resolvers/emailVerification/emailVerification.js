var path = require('path');

var pythonScriptPath = path.join(__dirname, 'send-email.py');

function sendEmail(email, link) {

    // Use child_process.spawn method from
    // child_process module and assign it
    // to variable spawn
    var spawn = require("child_process").spawn;

    // Parameters passed in spawn -
    // 1. python3
    // 2. list containing Path of the script (./send-email.py)
    //    and arguments for the script (link)

    var process = spawn('python3', [pythonScriptPath, email, link]);

    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        console.log(data.toString());
    })

    process.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });
}

module.exports = { sendEmail }