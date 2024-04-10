import vuex from 'vuex'

const moment = {
    namespaced: true,
    state: {
        isSearch: false,
        searchKey:{}
    },
    getters: {
        getSearchKey: state => {
            return state.searchKey;
        }
    },
    mutations: {
        setSearchKey(state, searchKey) {
            state.searchKey = searchKey
        },
        setIsSearch(state, isSearch) {
            state.isSearch = isSearch
        }
    },
    actions: {

    },
}
export default moment
