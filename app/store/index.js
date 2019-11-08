import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import main from './main.module';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        main
    }
});

Vue.prototype.$store = store;
export default store;
