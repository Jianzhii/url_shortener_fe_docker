import { shortenUrl } from '@/api/url_shortener'

const getDefaultState = () => {
    return {
        long_url: '',
        alias: '',
    }
}

const state = getDefaultState()
const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_SHORT_URL: (state, alias) => {
        state.alias = alias
    },
    SET_LONG_URL: (state, long_url) => {
        state.long_url = long_url
    }
}

const actions = {
    shortenUrl({ commit }, req) {
        const { long_url, alias } = req
        return new Promise((resolve, reject) => {
            shortenUrl({ long_url: long_url, alias: alias })
                .then((response) => {
                    const { data } = response
                    commit('SET_LONG_URL', data.long_url)
                    commit('SET_SHORT_URL', data.alias)
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    resetState({ commit }) {
        return new Promise((resolve) => {
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
