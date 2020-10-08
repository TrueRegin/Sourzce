<template>
    <button @click='uploadFiles' id="upload-files" class='icon-btn'>
        <fa icon="upload"></fa>
        <span>Upload</span>
    </button>
</template>

<script lang="ts" src="./ts/UploadFilesWidget.ts"></script>

<style lang="sass">
#upload-files
    $prime: #34d8d0
    $secon: #fff
    $terti: #27d989
    $tetra: #fff5
    padding: 20px
    background: $prime
    color: $secon
    border-color: $secon

    &:hover
        background: $terti

    &:focus
        background: $tetra
        color: $terti
        border-color: $terti

</style>
