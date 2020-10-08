<template>
     <div id="file-input">
          <label id="file-label" ref="files" tabindex="0" for="file-upload">
               <i class="fas fa-copy"></i>
               Select Files {{getFiles.length}}
          </label>
          <input @change="updateFiles" ref="file-input" type="file" multiple id="file-upload" />
     </div>
</template>

<script lang="ts" src="./ts/FileUploader.ts"></script>

<style lang="sass" src="./sass/FileUploader.sass"></style>
