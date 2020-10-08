import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBan, faUpload, faCopy, faHamburger, faTrash, faICursor, faMouse, faMousePointer, faRedo, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import { getBaseUrl } from '@/utils/load.serverURL.ts'
import '@/types.ts'
import '@/vendors/Notyf.ts'
import { preventButtonFocus } from '@/utils/prevent.buttonFocus.ts'

// # Adding icons in here
library.add(faBan, faUpload, faCopy, faHamburger, faTrash, faMousePointer, faRedoAlt)
// # Adding icons in here

//
//
//
//
//
//
//
//
//
//
//
//
//

Vue.component('fa', FontAwesomeIcon)

Vue.config.productionTip = false

async function loadAxios () {
    const baseURL = await getBaseUrl()
    Vue.prototype.$baseURL = baseURL
    Vue.prototype.$local = (route: string) => { return baseURL + route }
    Vue.use(
        VueAxios,
        Axios,
        Axios.create({
            baseURL
        })
    )
}
function loadVue () {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')

    preventButtonFocus()
}

function init () {
    loadAxios()
    loadVue()
}
init()
