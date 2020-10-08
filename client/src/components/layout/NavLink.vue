<template>
    <div @click="$emit('click')" class='nav-link'>
        <router-link :style='{color: route.color}' class='nav-link-item' :to="route.to">
            <fa :icon='route.icon'></fa>
            <span>{{route.name}}</span>
        </router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        route: Object
    }
})
</script>

<style lang="sass" scoped>
.nav-link
    height: 100%
    border-radius: 5px
    overflow: hidden
    box-shadow: 0 6px 14px #0005

.nav-link-item
    display: grid
    gap: 5px
    justify-content: center
    justify-items: center
    align-content: center
    text-decoration: underline
    color: #13fa9a
    background: #253649
    font-family: 'Montserrat', Verdana, Geneva, Tahoma, sans-serif
    font-weight: bold
    transition: background 200ms, color 200ms
    padding: 10px
    box-sizing: border-box
    height: 100%

    &:hover
        color: #fff
        background: #337
    &:focus
        border: 2px solid #fff
        background: #559

</style>
