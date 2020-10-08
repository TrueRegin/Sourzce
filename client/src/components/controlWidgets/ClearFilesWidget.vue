<template>
     <button @click="emptyFiles" id='clear-files' class='icon-btn'>
          <fa icon="ban"></fa>Clear Files
     </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { getNotyf } from '@/vendors/Notyf'

export default Vue.extend({
    methods: {
        emptyFiles () {
            this.clearFiles()
            getNotyf().dismissAll()
        },
        ...mapActions(['clearFiles'])
    }
})
</script>

<style lang="sass">
// # Try to reuse this style in a component, the 3 color styles

#clear-files
    $prime: #ffd43b
    $secon: #fff
    $terti: #ffba3b
    $tetra: #fff5
    $btn-t: 200ms
    background: $prime
    color: $secon
    border-color: $secon

    &:hover
        background: $terti

    &:focus
        background: $tetra
        color: $terti
        border-color: $terti
</style>
