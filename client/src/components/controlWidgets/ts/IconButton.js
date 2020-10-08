import { v4 } from 'uuid'
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        _id: v4()
    }),
    props: {
        icon: String,
        color: String,
        background: String
    },
    computed: {
        ref () {
            return 'icon-button:' + this._id
        }
    },
    mounted () {
        const ref = this.ref
        /** @type { HTMLButtonElement } */
        const btn = this.$refs[ref]
        btn.addEventListener('click', this.preventButtonFocus)
    },
    methods: {
        preventButtonFocus () {
            const ref = this.ref
            /** @type { HTMLButtonElement } */
            const btn = this.$refs[ref]
            btn.focus()
            btn.blur()
        }
    },
    beforeDestroy () {
        const ref = this.ref
        /** @type { HTMLButtonElement } */
        const btn = this.$refs[ref]
        btn.removeEventListener('click', this.preventButtonFocus)
    }
})
