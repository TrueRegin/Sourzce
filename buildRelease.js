const fs = require('fs');
const { join, resolve } = require('path');
const pathToRelease = '/release';

/**
 *
 * @param {string} folderPath An absolute path to the folder you want to delete
 */
function deleteFolder(folderPath) {
     if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
          deleteFolderContents(folderPath);
          fs.rmdirSync(folderPath);
     }
}

/**
 *
 * @param {string} folderPath An absolute path to the folder you want to delete
 */
function deleteFolderContents(folderPath) {
     if (fs.existsSync(folderPath)) {
          const fileNames = fs.readdirSync(folderPath, {});
          fileNames.forEach((file) => {
               const filePath = join(folderPath, file);
               if (fs.statSync(filePath).isDirectory()) deleteFolder(filePath);
               else fs.unlinkSync(filePath);
          });
     }
}

/**
 * Copies a directory to an output directory, this including all of the targets contents
 * @param {string} targetPath - The directory you want to copy
 * @param {string} outputPath - Path to the folder to copy the target directory to
 */
function copyFolder(targetPath, outputPath) {
     if (
          fs.existsSync(targetPath) &&
          fs.existsSync(resolve(outputPath, '..'))
     ) {
          if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);
          copyFolderContents(targetPath, outputPath);
     }
}

/**
 * Copies the contents of the target directory folder to an output directory
 * @param {string} targetPath - The directory you want to copy
 * @param {string} outputPath - Path to the folder to copy the target directory to
 */
function copyFolderContents(targetPath, outputPath) {
     if (fs.existsSync(targetPath)) {
          if (
               fs.existsSync(resolve(outputPath, '..')) &&
               !fs.existsSync(outputPath)
          )
               fs.mkdirSync(outputPath);

          fs.readdirSync(targetPath, {}).forEach((file) => {
               console.log(file);
               const targetFilePath = resolve(targetPath, file);
               const outputFilePath = resolve(outputPath, file);

               if (fs.statSync(targetFilePath).isDirectory()) {
                    copyFolder(targetFilePath, outputFilePath);
               } else {
                    fs.copyFileSync(targetFilePath, outputFilePath);
               }
          });
     }
}

function initAndCleanRelease() {
     if (!fs.existsSync(join(__dirname, pathToRelease)))
          fs.mkdir(join(__dirname, pathToRelease), (err) => {
               if (err) console.log('Directory Create Error', err);
          });
     else deleteFolderContents(join(__dirname, pathToRelease));
}

initAndCleanRelease();
/**
 * Copies the client DIST, server DIST, and creates
 * the public folders for the server
 */
copyFolderContents(
     resolve(__dirname, 'server/dist'),
     resolve(__dirname, 'release/dist')
);
copyFolderContents(
    resolve(__dirname, 'client/dist'),
    resolve(__dirname, 'release/client')
)
fs.mkdirSync(resolve(__dirname, 'release/public'))
fs.mkdirSync(resolve(__dirname, 'release/public/images'))
fs.mkdirSync(resolve(__dirname, 'release/public/uploads'))
fs.copyFileSync(resolve(__dirname, 'server/package.json'), resolve(__dirname, 'release/package.json'))
fs.copyFileSync(resolve(__dirname, 'README.md'), resolve(__dirname, 'release/README.md'))