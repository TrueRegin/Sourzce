import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { getNotyf } from '@/vendors/Notyf.ts'
import { UPLOAD_ROUTES } from '@C'

const notifs = getNotyf()

export default Vue.extend({
    props: {
        uploadRoute: {
            type: String,
            required: true
        },
        validTypes: {
            type: Array,
            default () {
                return [
                    {
                        test: /.+/,
                        name: 'Any'
                    }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['getFiles'])
    },
    methods: {
        uploadFiles () {
            const xhr = new XMLHttpRequest()
            const formData = new FormData()
            let typeError = false
            const validTypes = this.validTypes as {test: RegExp; name: string}[]

            if (this.getFiles && this.getFiles.length > 0) {
                for (const f in this.getFiles) {
                    for (const t in validTypes) {
                        const typeRegex = validTypes[t]
                        const file = this.getFiles[f].file as File
                        if (typeRegex.test.test(file.type)) formData.append('uploadFiles', file)
                        else {
                            typeError = true
                            notifs.open({
                                background: '#fa1',
                                ripple: true,
                                duration: 10,
                                message: `Couldn't upload <strong>${file.name}</strong>, invalid filetype...<br><hr>Valid filetypes are ${validTypes.map(e => e.name).join(' ')}`
                            })
                        }
                    }
                }

                if (typeError) {
                    notifs.error('File upload cancelled! Remove Invalid Files')
                } else {
                    xhr.open('POST', this.$local(this.uploadRoute))
                    xhr.send(formData)

                    xhr.onreadystatechange = (event) => {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            const status = xhr.status
                            if (status === 0) {
                                this.$emit('error')
                                notifs.error(
                                    'ERROR<br>Server request timed out, is the Sourzce server running?'
                                )
                            } else if (status >= 200 && status < 300) {
                                this.$emit('success')
                                const uploadCount = this.getFiles.length
                                const s = uploadCount > 1 ? 's' : ''
                                this.clearFiles()
                                notifs.success(
                                    `<strong>UPLOAD COMPLETE</strong><br>${uploadCount} file${s} successfully uploaded!`
                                )
                            } else {
                                this.$emit('error')
                                if (status === 400) {
                                    notifs.error(
                                        '<strong>ERROR</strong><br>no files uploaded, select some files first!'
                                    )
                                } else {
                                    notifs.error(
                                        '<strong>ERROR</strong><br>An error occured while uploading files!'
                                    )
                                }
                            }
                        }
                    }
                }
            } else {
                notifs.error(
                    'ERROR<br>no files uploaded, select some files first!'
                )
            }
        },
        ...mapActions(['clearFiles'])

    }
})
