<template>
     <div
          ref="app"
          id="app"
          @keypress="toggleCredits"
     >
          <Header></Header>
          <div id="page">
               <router-view></router-view>
          </div>
          <Credits :visible="creditsVis"></Credits>
          <!-- <FileDropper :visible="fileDropperVis"></FileDropper> -->
     </div>
</template>

<script lang="ts">
import FileDropper from './components/fileWidgets/FileDropper.vue'
import Credits from './components/layout/Credits.vue'
import Vue from 'vue'
import Header from '@/components/layout/Header.vue'
import { Key } from 'ts-keycode-enum'
import { preventButtonFocus } from './utils/prevent.buttonFocus'
import { mapActions } from 'vuex'
import { v4 } from 'uuid'
import { getDragTimer, loadEventFunctions, setDragTimer } from '@/utils/filedropper.events'

export default Vue.extend({
    mounted () {
        loadEventFunctions(this.showFileDropper, this.addDroppedFiles, this.hideFileDropper)
    },
    data: () => ({
        creditsVis: false,
        fileDropperVis: false,
        initialized: false
    }),
    methods: {
        toggleCredits () {
            this.creditsVis = !this.creditsVis
        },
        showFileDropper (e: DragEvent) {
            e.preventDefault()
            e.stopPropagation()
            this.fileDropperVis = true
        },
        addDroppedFiles (e: DragEvent) {
            if (e.dataTransfer && e.dataTransfer.files) {
                const droppedFiles = e.dataTransfer.files
                const newFiles: LocalFile[] = []
                for (let i = 0; i < droppedFiles.length; i++) {
                    newFiles.push({
                        file: droppedFiles[i],
                        meta: {
                            _id: v4()
                        }
                    })
                }
                this.addFiles(newFiles)
            }
            setTimeout(() => {
                this.hideFileDropper(e)
            }, 25)
        },
        hideFileDropper (e: DragEvent) {
            e.preventDefault()
            e.stopPropagation()

            window.clearTimeout(getDragTimer())
            setDragTimer(window.setTimeout(() => {
                this.fileDropperVis = false
            }, 25))
        },
        ...mapActions(['addFiles'])
    },
    components: {
        Header,
        Credits
    }
})
</script>

<style lang="sass">
@import './assets/notyf.css'

html, body, #nav
    width: 100%
    height: 100%

html
    font-family: Montserrat

body
    margin: 0

button
    $btn-t: 120ms
    border: none
    outline: none
    cursor: pointer
    transition: background $btn-t, color $btn-t, font-size $btn-t

#app
    display: grid
    grid-template-areas: 'header' 'page'
    grid-template-rows: $header-height 1fr
    width: 100%
    height: 100%

    #header
        grid-area: header

    #page
        box-sizing: border-box
        grid-area: page
        background: #f3f3f3
        width: 100%
        height: 100%
        background-size: 30px

        & > *
            display: grid
            grid-template-areas: 'controls' 'content'
            grid-template-rows: max-content 1fr
            width: 100%
            height: 100%
            background: linear-gradient(200deg, #2d3345, #4a417a)
</style>
