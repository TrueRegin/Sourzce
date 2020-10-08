<template>
    <div id="credits" v-if="visible">
        <div></div>
    </div>
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

<style lang="sass" scoped>
    #credits
        background: #0003
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 100

</style>
