<template>
     <div id="file-preview" :class="{column}">
          <File
               @move-up="swapFiles([i, i-1])"
               @move-down="swapFiles([i, i+1])"
               @deletefile="deleteFile(i)"
               @selectfile="selectFile([file.meta._id])"
               v-for="(file, i) in getFiles"
               :key="file.meta._id"
               :file="file.file"
               :selected="isSelected(file.meta._id)"
          ></File>
     </div>
</template>

<script lang="ts">
import File from './File.vue'
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { FILE_MODES } from '@C'
export default Vue.extend({
    components: { File },
    data: () => ({
        drag: false
    }),
    props: {
        column: Boolean
    },
    methods: {
        selectFile (_id: string) {
            console.log(this.getFilemode, this.isSelected(_id), _id)
            if (this.getFilemode === FILE_MODES.SELECT && !this.isSelected(_id)) {
                this.selectFiles(_id)
            } else {
                this.deselectFiles(_id)
            }
        },
        deleteFile (i: number) {
            if (this.getFilemode === FILE_MODES.DELETE) {
                this.removeFile(i)
            }
        },
        ...mapActions(['removeFile', 'swapFiles', 'selectFiles', 'deselectFiles', 'deselectAll'])
    },
    computed: {
        ...mapGetters(['getFiles', 'getFilemode', 'isSelected'])
    }
})
</script>

<style lang="sass">
#file-preview
    display: grid
    width: 100%
    height: 100%
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
    grid-template-rows: minmax(150px, max-content)
    box-sizing: border-box
    gap: 20px
    padding: 20px

    justify-items: center
    align-items: center

    & > *
        max-width: 1fr
        max-height: 100vh
        cursor: pointer

    &.column
        grid-template-columns: 1fr
</style>
