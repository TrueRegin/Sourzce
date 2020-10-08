<template>
     <button
          @click="changeFilemode"
          id="delete-mode"
          class="icon-btn"
          :class="{selected: getFilemode === 'delete'}"
     >
          <fa icon="trash"></fa>
          <span class="text">Deleting Files</span>
     </button>
</template>

<script lang="js">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { FILE_MODES } from '@C'
import { getNotyf } from '@/vendors/Notyf'

export default Vue.extend({
    computed: {
        ...mapGetters(['getFilemode'])
    },
    methods: {
        ...mapActions(['setFilemode']),
        changeFilemode () {
            this.setFilemode(FILE_MODES.DELETE)
        }
    }
})

</script>

<style lang="sass">
// # Try to reuse this style in a component, the 3 color styles

$prime: #ff4242
$secon: #fff
$terti: #ff3863
$tetra: #fff5

#delete-mode
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
