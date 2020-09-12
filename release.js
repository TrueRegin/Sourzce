const fs = require('fs')
const { join } = require('path')

/**
 * 
 * @param {string} folderPath An absolute path to the folder you want to delete 
 */
function deleteFolder(folderPath) {
    if(fs.existsSync(folderPath)) {
        fs.readdir(folderPath, (err, files) => {
            files.forEach(file => {
                const filePath = join(folderPath, file);
                if(fs.statSync(filePath).isDirectory())
                    deleteFolder(filePath)
            })
        })
        console.log(folderPath)
    }
}

deleteFolder('./release')