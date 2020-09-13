import '@/sass/main.sass';
import '@/assets/logo.png';
import { Notyf } from 'notyf';
import axios from 'axios';
import "@/assets/manifest.json"
import {localIP} from './constants.ts'

/**
 * Adding the service worker (if we can);
 */
if('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register('/sw.js').then(reg => {}).catch(regError => {
            throw new Error("Service Worker Registration Error: " + regError)
        })
    })
}

/** Change this to your LAN ip */
const fileInput = document.querySelector('#file-upload')! as HTMLInputElement;
const fileLabel = document.querySelector('#file-label')! as HTMLLabelElement;
const filePreview = document.querySelector('#file-preview')! as HTMLDivElement;
let baseUrl: string | undefined = undefined;
axios.get('/SERVER_IP')
     .then((res) => {
          if (res.data && typeof res.data === 'string') baseUrl = '';
     })
     .catch((err) => {});
if (typeof baseUrl !== 'string') baseUrl = localIP;

const uploadText = '<i class="fas fa-upload"></i>\nUpload';
document.querySelectorAll('button').forEach((button) => {
     button.addEventListener('click', (event) => {
          button.focus();
          button.blur();
     });
});
fileLabel.addEventListener('keypress', (event) => {
     if (event.keyCode === 13) {
          console.log('HEY');
          fileInput.click();
     }
});

const notifs = new Notyf({
     dismissible: true,
     position: {
          x: 'center',
          y: 'bottom',
     },
});

/** File Input Code */
let files: HTMLElement[] = [];
fileInput.addEventListener('input', (event) => {
     if (fileInput.files) {
          for (let i = 0; i < fileInput.files.length; i++) {
               let file = fileInput.files[i];

               let imageRegex = /^image\/(png|jpe?g|x-icon)/;
               if (imageRegex.test(file.type)) {
                    let fileImg = document.createElement('img');
                    fileImg.classList.add('preview-image');
                    fileImg.src = URL.createObjectURL(file);
                    files.push(fileImg);
                    fileImg.addEventListener('click', () => {
                         let index = parseInt(
                              fileImg.getAttribute('file-index')!
                         );
                         files.splice(index, 1);
                         updateUploadBtn();
                         renderPreview();
                    });
               } else {
                    let fileDiv = document.createElement('div');
                    fileDiv.classList.add('preview-details');
                    fileDiv.innerText = `${file.name} : ${file.size} : ${file.lastModified} : ${file.type}`;
                    files.push(fileDiv);
                    fileDiv.addEventListener('click', () => {
                         let index = parseInt(
                              fileDiv.getAttribute('file-index')!
                         );
                         files.splice(index, 1);
                         updateUploadBtn();
                         renderPreview();
                    });
               }
          }

          renderPreview();
     }
});
function renderPreview() {
     filePreview.innerHTML = '';
     updateUploadBtn();
     files.forEach((file, i) => {
          file.setAttribute('file-index', i.toString());
          filePreview.append(file);
     });
}

/** Button Code */
const uploadBtn = document.querySelector('#upload')! as HTMLButtonElement;
const clearAllBtn = document.querySelector('#clear-all')! as HTMLButtonElement;

uploadBtn.addEventListener('click', (event) => {
     const xhr = new XMLHttpRequest();
     const formData = new FormData();

     if (fileInput.files) {
          for (let file in fileInput.files) {
               formData.append('uploadFiles', fileInput.files[file]);
          }
          xhr.open('POST', local('/upload'));
          xhr.send(formData);
          xhr.onreadystatechange = (event) => {
               if (xhr.readyState === XMLHttpRequest.DONE) {
                    const status = xhr.status;
                    if (status === 0 || (status >= 200 && status < 300)) {
                         clearFiles();
                    } else {
                         if (status === 400) {
                              notifs.error(
                                   'ERROR<br>no files uploaded, select some files first!'
                              );
                         } else {
                              notifs.error(
                                   'An error occured while uploading files!'
                              );
                         }
                    }
               }
          };
     } else {
          notifs.error('ERROR<br>no files uploaded, select some files first!');
     }
});
function local(route: string): string {
     return baseUrl + route;
}

/** Clear All Button
 *  gets rid of all files set to be uploaded
 */
clearAllBtn.addEventListener('click', (event) => {
     clearFiles();
});

function clearFiles() {
     files = [];
     fileInput.value = '';
     notifs.dismissAll();
     renderPreview();
}

function updateUploadBtn() {
     if (files && files.length > 0) {
          uploadBtn.innerHTML = `${uploadText} (${files.length})`;
     } else {
          uploadBtn.innerHTML = uploadText;
     }
}
