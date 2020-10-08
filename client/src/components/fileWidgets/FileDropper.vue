<template>
    <div id="file-dropper" :class="{hidden: !visible}">F Droppper</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    }
})
</script>

<style lang="sass">
#file-dropper
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #0005
    z-index: 101
    color: #fff

    &.hidden
        display: none
</style>
