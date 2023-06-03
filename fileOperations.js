// fileOperations.js
const fs = require('fs');
const path = require('path');

function updateFile() {
    let filePath = path.join(__dirname, 'controllers', 'productController.js');

    fs.readFile(filePath, 'utf8', function(err, data){
        if (err){
            return console.log(err);
        }

        let newData = data + '\n// New line to add';

        fs.writeFile(filePath, newData, 'utf8', function(err){
            if (err) return console.log(err);
        });
    });
}

module.exports = {
    updateFile: updateFile
};
