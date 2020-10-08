<template>
     <div id="upload-progress-bar" class="hidden">
          <div value="0" max="1" id="upload-progress">Uploading . . .</div>
     </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        disableCount: 0
    }),
    props: {
        uploading: {
            required: true,
            type: Boolean
        }
    },
    methods: {}
})
</script>

<style lang="sass" src='./sass/UploadProgress.sass'></style>
