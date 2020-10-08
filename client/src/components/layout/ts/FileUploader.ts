import { FILETYPE } from '@/types'
import { v4 } from 'uuid'
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
    methods: {
        updateFiles () {
            const fileInput = this.$refs['file-input'] as HTMLInputElement
            const files: LocalFile[] = []
            if (fileInput.files) {
                for (let i = 0; i < fileInput.files.length; i++) {
                    const file = fileInput.files[i]
                    const parsedFile = {
                        file,
                        meta: {
                            _id: v4()
                        }
                    }
                    files.push(parsedFile)
                }
                this.addFiles(files)
                fileInput.files = null
            }
        },
        ...mapActions(['addFiles'])
    },
    computed: {
        ...mapGetters(['getFiles'])
    }
})
