<template>
     <div id="nav-wrapper">
          <button id="open-nav" @click="navActive = !navActive">{{$route.meta.title}}</button>
          <div id="nav-links" :class="{hidden: !navActive}">
               <nav id="nav">
                    <NavLink
                         @click="navActive = false"
                         v-for="(route, i) in routes"
                         :key="i"
                         :route="route"
                    ></NavLink>
               </nav>
          </div>
     </div>
</template>

<script lang="ts">
import NavLink from '@/components/layout/NavLink.vue'
import Vue from 'vue'
import { routes } from '@/router/routes.ts'
import { preventButtonFocus } from '@/utils/prevent.buttonFocus'

export default Vue.extend({
    components: { NavLink },
    data: () => ({
        navActive: false,
        routes
    })
})
</script>

<style lang="sass" src="./sass/Nav.sass"></style>
