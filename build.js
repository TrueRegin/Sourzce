const fs = require('fs');
const { join, resolve } = require('path');
const { execSync, exec } = require('child_process');
const { argv } = require('process');
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

/**
 *
 * @param {string} path
 * @param {string} contents
 */
function createFile(path, contents) {
     let filestream = fs.createWriteStream(path);
     filestream.write(contents);
     filestream.close();
}

function initAndCleanForRelease() {
     if (!fs.existsSync(join(__dirname, pathToRelease)))
          fs.mkdir(join(__dirname, pathToRelease), (err) => {
               if (err) console.error('Directory Create Error', err);
          });
     else deleteFolderContents(join(__dirname, pathToRelease));
     if (
          !fs.existsSync(join(__dirname, 'client')) ||
          !fs.existsSync(join(__dirname, 'server'))
     )
          throw new Error(
               "client or server folder doesn't exist inside of your project, WHAT THE HECK HAPPENED?!?!?!"
          );
     else {
          deleteFolderContents('./client/dist');
          deleteFolderContents('./server/dist');
     }
}

/**
 *
 * @param {boolean} buildRelease
 */
function updateServerClient(buildRelease) {
     if (buildRelease)
          execSync('yarn build', { cwd: resolve(__dirname, 'client') });
     deleteFolderContents('./server/client');
     copyFolderContents(
          resolve(__dirname, 'client/dist'),
          resolve(__dirname, 'server/client')
     );
}

function buildRelease() {
     initAndCleanForRelease();

     updateServerClient(true);
     copyFolderContents(
          resolve(__dirname, 'client/dist'),
          resolve(__dirname, 'release/client')
     );
     execSync('yarn build', { cwd: resolve(__dirname, 'server') });
     copyFolderContents(
          resolve(__dirname, 'server/dist'),
          resolve(__dirname, 'release/dist')
     );
     fs.mkdirSync(resolve(__dirname, 'release/public'));
     fs.mkdirSync(resolve(__dirname, 'release/public/images'));
     fs.mkdirSync(resolve(__dirname, 'release/public/uploads'));
     fs.mkdirSync(resolve(__dirname, 'release/public/temp'));
     fs.mkdirSync(resolve(__dirname, 'release/public/pdf'));
     fs.copyFileSync(
          resolve(__dirname, 'server/package.json'),
          resolve(__dirname, 'release/package.json')
     );
     fs.copyFileSync(
          resolve(__dirname, 'README.md'),
          resolve(__dirname, 'release/README.md')
     );

     createFile('./release/install.bat', 'npm install --only=prod');
     createFile('./release/run.bat', 'npm run start:prod');
}

function compileDev(buildClient) {
     updateServerClient(buildClient);
}

argv.forEach((arg) => {
     if (arg === 'release') buildRelease();
     else if (arg === 'client') compileDev(true);
     else if (arg === 'watch') compileDev();
});
