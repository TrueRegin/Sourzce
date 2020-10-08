import { FILE_MODES } from '@C'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        files: [] as LocalFile[],
        // Haha guess what, the ids are actually the keys...
        selected: [] as string[],
        filemode: FILE_MODES.SELECT
    },
    mutations: {
        // ~ File Mutations
        addFiles (state, files) { state.files = [...state.files, ...files] },
        removeFile (state, indexPayload) { state.files = state.files.filter((f, i) => { return i !== indexPayload }) },
        clearFiles (state) { state.files = []; state.selected = [] },
        swapFiles (state, [ind1, ind2]) {
            if (ind1 >= 0 && ind1 < state.files.length && ind2 >= 0 && ind2 < state.files.length) {
                const newFiles = [...state.files]
                const val1 = newFiles[ind1]
                newFiles[ind1] = newFiles[ind2]
                newFiles[ind2] = val1
                state.files = [...newFiles]
            }
        },
        selectFiles (state, fileIds: string[]) {
            const idsToAdd = fileIds.filter(_id => {
                if (!state.selected.includes(_id)) {
                    return _id
                }
            })
            state.selected = [...state.selected, ...idsToAdd]
        },
        deselectFiles (state, fileIds: string[]) {
            const deselectFiles = state.selected.filter(deselectId => {
                for (let i = 0; i < fileIds.length; i++) {
                    return fileIds[i] !== deselectId
                }
            })

            state.selected = [...deselectFiles]
        },
        deselectAll (state) {
            state.selected = []
        },
        // ~ Filemode mutations
        setFilemode (state, filemode) { state.filemode = filemode }

    },
    actions: {
        // ~ File Actions
        addFiles ({ commit }, filesPayload) { commit('addFiles', filesPayload) },
        removeFile ({ commit }, indexPayload) { commit('removeFile', indexPayload) },
        clearFiles ({ commit }) { commit('clearFiles') },
        swapFiles ({ commit }, indicesPayload) { commit('swapFiles', indicesPayload) },
        setFilemode ({ commit }, filemodePayload) { commit('setFilemode', filemodePayload) },
        // ~ Filemode Actions
        selectFiles ({ commit }, _idPayload: number[]) {
            commit('selectFiles', _idPayload)
        },
        deselectFiles ({ commit }, _idPayload: number[]) {
            commit('deselectFiles', _idPayload)
        },
        deselectAll ({ commit }) {
            commit('deselectAll')
        }
    },
    getters: {
        getFiles (state) { return [...state.files] },
        getFilemode (state) { return state.filemode },
        getSelected (state) { return state.selected },
        isSelected: (state) => (fileId: string) => { return state.selected.includes(fileId.toString()) }
    },
    modules: {}
})
