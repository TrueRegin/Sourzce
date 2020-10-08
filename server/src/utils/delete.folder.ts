import fs = require('fs')
import { join } from 'path';

/**
 *
 * @param {string} folderPath An absolute path to the folder you want to delete
 */
export function deleteFolderContents(folderPath: string) {
    if (fs.existsSync(folderPath)) {
         const fileNames = fs.readdirSync(folderPath, {});
         fileNames.forEach((file) => {
              const filePath = join(folderPath, file);
              if (fs.statSync(filePath).isDirectory()) deleteFolder(filePath);
              else fs.unlinkSync(filePath);
         });
    }
}

export function deleteFolder(folderPath: string) {
    if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
         deleteFolderContents(folderPath);
         fs.rmdirSync(folderPath);
    }
}