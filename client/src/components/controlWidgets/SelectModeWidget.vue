<template>
     <button
          @click="changeFilemode"
          id="select-mode"
          class="icon-btn"
          :class="{selected: getFilemode === 'select'}"
     >
          <fa icon="mouse-pointer"></fa>
          <span class="text">Selecting Files</span>
     </button>
</template>

<script lang="js">
import Vue from 'vue'
import { FILE_MODES } from '@C'
import { mapActions, mapGetters } from 'vuex'
import { getNotyf } from '@/vendors/Notyf'

export default Vue.extend({
    computed: {
        ...mapGetters(['getFilemode'])
    },
    methods: {
        ...mapActions(['setFilemode']),
        changeFilemode () {
            this.setFilemode(FILE_MODES.SELECT)
        }
    }
})

</script>

<style lang="sass">
// # Try to reuse this style in a component, the 3 color styles

$prime: #699eff
$secon: #fff
$terti: #4e81de
$tetra: #684ede

#select-mode
    display: grid
    align-items: center
    gap: 10px

    background: $prime
    color: $secon
    border-color: $secon

    &:hover
        background: $terti

    &:focus
        background: $terti
        color: $terti
        border-color: $terti

    &.selected
        box-shadow: 0 5px 12px $prime
        transform: translateY(3px) scale(0.9)
</style>
