import getters from './getters'
import url_shortener from './modules/url_shortener'

import { createStore } from 'vuex'

const store = createStore({
    modules: {
        url_shortener
    },
    getters,
})

export default store
