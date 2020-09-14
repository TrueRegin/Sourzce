import '@/sass/main.sass';
import '@/assets/logo.png';
import { Notyf } from 'notyf';
import axios from 'axios';
import '@/assets/manifest.json';
import { DEV_IP, EXISTS_ROUTE } from '@C';

/**
 * Adding the service worker (if we can);
 */
if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
          navigator.serviceWorker
               .register('/sw.js')
               .then((reg) => {})
               .catch((regError) => {
                    throw new Error(
                         'Service Worker Registration Error: ' + regError
                    );
               });
     });
}

/** Change this to your LAN ip */
const uploadProgressBar = document.querySelector(
     '#upload-progress-bar'
) as HTMLDivElement;
const uploadProgress = document.querySelector(
     '#upload-progress'
) as HTMLProgressElement;
const fileInput = document.querySelector('#file-upload')! as HTMLInputElement;
const fileLabel = document.querySelector('#file-label')! as HTMLLabelElement;
const filePreview = document.querySelector('#file-preview')! as HTMLDivElement;
let baseUrl: string | undefined = undefined;
axios.get(EXISTS_ROUTE)
     .then((res) => {
          if (res.data && res.data.exists === true) baseUrl = '';
          baseUrl = DEV_IP;
     })
     .catch((err) => {
          baseUrl = DEV_IP;
     });

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
let uploading = false;

uploadBtn.addEventListener('click', (event) => {
     const xhr = new XMLHttpRequest();
     const formData = new FormData();

     if (fileInput.files) {
          for (let file in fileInput.files) {
               formData.append('uploadFiles', fileInput.files[file]);
          }
          xhr.open('POST', local('/upload'));
          xhr.send(formData);

          enableUploadBar();

          xhr.onreadystatechange = (event) => {
               if (xhr.readyState === XMLHttpRequest.DONE) {
                    const status = xhr.status;
                    if (status === 0) {
                        disableUploadBar('error');
                        notifs.error("ERROR<br>Server request timed out, is the Sourzce server running?")
                    } else if (status >= 200 && status < 300) {
                        disableUploadBar('success');
                        const uploadCount = files.length
                        clearFiles();
                        if(uploadCount <= 1) notifs.success(`<strong>UPLOAD COMPLETE</strong><br>${uploadCount} file successfully uploaded!`)
                        else notifs.success(`<strong>UPLOAD COMPLETE</strong><br>${uploadCount} files successfully uploaded!`)
                    } else {
                         disableUploadBar('error');
                         if (status === 400) {
                              notifs.error(
                                   '<strong>ERROR</strong><br>no files uploaded, select some files first!'
                              );
                         } else {
                              notifs.error(
                                   '<strong>ERROR</strong><br>An error occured while uploading files!'
                              );
                         }
                    }
               }
          };
     } else {
          notifs.error('ERROR<br>no files uploaded, select some files first!');
     }
});
function enableUploadBar() {
     uploadProgressBar.classList.remove('hidden');
     uploadProgress.classList.add('uploading');
     uploading = true;
     uploadProgress.value = 0;
     uploadProgress.innerText = 'Uploading. . .';
}
let disableCount = 0;
function disableUploadBar(statusClass: string) {
     uploadProgressBar.classList.add('hidden');
     uploadProgress.classList.add(statusClass);
     uploadProgress.classList.remove('uploading');
     disableCount++;
     setTimeout(() => {
          if (disableCount === 1) uploadProgress.classList.remove(statusClass);
          disableCount--;
     }, 500);
     uploading = false;
     uploadProgress.value = 0;
     uploadProgress.innerText = '';
}
function updateUploadBar(progress: number) {
     if (uploading) {
          uploadProgress.value = progress;
     }
}
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
