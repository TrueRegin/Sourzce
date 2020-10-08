<template>
    <header id="header">
        <FileUploader></FileUploader>
        <Nav></Nav>
    </header>
</template>

<script lang="ts">
import Vue from 'vue'
import FileUploader from '@/components/layout/FileUploader.vue'
import Nav from '@/components/layout/Nav.vue'

export default Vue.extend({
    components: {
        FileUploader,
        Nav
    }
})
</script>

<style lang="sass">
#header
    display: grid
    grid-template-columns: max-content 1fr
    grid-template-rows: $header-height
    background: #55f
</style>
