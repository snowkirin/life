import Vue from "nativescript-vue";
import App from "./components/App";
import Home from "./components/Home";
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import RadListView from 'nativescript-ui-listview/vue';

import store from './store';

Vue.use(RadSideDrawer);
Vue.use(RadListView);

Vue.config.silent = (TNS_ENV === 'production');

new Vue({
    render(h) {
        return h(
            App,
            [
                h(DrawerContent, {slot: 'drawerContent'}),
                h(Home, {slot: 'mainContent'})
            ]
        )
    },
    store,
}).$start();
