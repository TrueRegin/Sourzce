<template>
     <div
          @keypress.delete="$emit('deletefile')"
          @click="
               $emit('deletefile');
               $emit('selectfile');
          "
          class="file"
          :class="{ selected }"
     >
          <div class="file-content">
               <img class="image-preview" v-if="isImage" :src="url" />
               <audio class="audio-preview" v-else-if="isAudio" controls>
                    <source :src="url" :type="isAudio.type" />
               </audio>
               <video
                    class="video-preview"
                    v-else-if="isVideo"
                    :src="url"
                    :type="isVideo.type"
               />
                <div class="file-preview" :class="{hidden: !showFileinfo}">
                    <span class="file-name">{{ file.name }}</span>
                    <br />
                    <span class="last-modified"
                        >Last Modified:
                        {{ new Date(file.lastModified).toUTCString() }}</span
                    >
                    <br />
                    <span>MIME Type: {{ file.type }}</span>
                </div>
          </div>

          <div class="file-controls" v-if='selected'>
               <IconButton @press="$emit('move-up')" icon="upload">Move Up</IconButton>
               <IconButton @press="$emit('move-down')" icon="upload"
                    >Move Down</IconButton
               >
               <!-- For future use, rotates an image 90deg -->
               <!-- <IconButton @press="$emit('rotate')" icon="redo-alt"></IconButton> -->
          </div>
     </div>
</template>

<script lang="ts">
import IconButton from '../controlWidgets/IconButton.vue'
import { FILETYPE } from '@/types'
import Vue from 'vue'

export default Vue.extend({
    components: { IconButton },
    props: {
        file: {
            required: true,
            type: File
        },
        meta: {
            type: Object
        },
        selected: {
            type: Boolean,
            required: true
        },
        showFileinfo: {
            type: Boolean,
            default: false
        }
    },
    methods: {
    },
    computed: {
        url () {
            return URL.createObjectURL(this.file)
        },
        isImage () {
            const regex = /image\/.+/
            const matches = this.file.type.match(regex)
            return matches ? matches[0] !== undefined : false
        },
        isAudio () {
            const regex = /audio\/.+/
            const matches = this.file.type.match(regex)
            return matches ? matches[0] !== undefined : false
        },
        isVideo () {
            const regex = /video\/.+/
            const matches = this.file.type.match(regex)
            return matches ? matches[0] !== undefined : false
        }
    }
})
</script>

<style lang="sass">
.file
    display: grid
    grid-template-rows: 1fr max-content
    color: #fff
    background: #001
    border-radius: 5px
    padding: 10px
    box-sizing: 5px
    box-sizing: border-box
    transition: box-shadow 300ms, opacity 300ms, transform 300ms

    &.selected
        filter: brightness(110%), blur(1px)

    .file-content
        display: grid
        justify-content: center
        justify-items: center
        align-content: center
        word-break: break-word
        gap: 10px
        height: 100%
        width: 100%

        .file-preview

            .file-name
                display: flex
                font-weight: bold
                font-size: 1.5em
                justify-content: center

    .file-controls
        box-sizing: border-box
        padding: 10px
        display: grid
        grid-auto-flow: column
        gap: 10px

    &:hover
        transform: scale(0.95)
        opacity: 1
        box-shadow: 0 5px 12px #0005
    &:focus
        transform: scale(0.90)
        opacity: 1
        box-shadow: 0 12px 24px #0005

.image-preview
    max-width: 100%
    max-height: 100%
    box-shadow: 0 3px 7px #0005
    border-radius: 3px
    user-select: none

    background-image: url("~@/assets/transparent_bg.svg")
    background-size: 20px 20px
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px
</style>
