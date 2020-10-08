<template>
    <div id='image-to-pdf'>
         <Controls>
             <ClearFilesWidget :uploadPath="postPath"></ClearFilesWidget>
             <UploadFilesWidget :validTypes="validTypes"></UploadFilesWidget>
             <DeleteModeWidget></DeleteModeWidget>
             <SelectModeWidget></SelectModeWidget>
         </Controls>
         <FilePreview column></FilePreview>
     </div>
</template>

<script lang="ts">
import SelectModeWidget from '../components/controlWidgets/SelectModeWidget.vue'
import DeleteModeWidget from '../components/controlWidgets/DeleteModeWidget.vue'
import FilePreview from '@/components/fileWidgets/FilePreview.vue'
import UploadFilesWidget from '@/components/controlWidgets/UploadFilesWidget.vue'
import ClearFilesWidget from '@/components/controlWidgets/ClearFilesWidget.vue'
import Controls from '@/components//layout/Controls.vue'
import Vue from 'vue'
import { UPLOAD_ROUTES } from '@C'
import { preventButtonFocus } from '@/utils/prevent.buttonFocus'
import { mapGetters } from 'vuex'

export default Vue.extend({
    components: { ClearFilesWidget, Controls, UploadFilesWidget, FilePreview, DeleteModeWidget, SelectModeWidget },
    mounted () {
        preventButtonFocus()
    },
    computed: {
        ...mapGetters(['getFilemode'])
    },
    data: () => ({
        postPath: UPLOAD_ROUTES.PDF,
        validTypes: [
            {
                test: /image\/.+/,
                name: 'Image'
            }
        ]
    })

})
</script>
