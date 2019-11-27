import Vue from "nativescript-vue";
import App from "./components/App";
import Home from "./components/Home";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
import RadListView from 'nativescript-ui-listview/vue';
import { Video } from 'nativescript-videoplayer';
import Common from './utils/Commons';

import store from './store';

Vue.use(RadSideDrawer);
Vue.use(RadListView);
Vue.use(Common);

Vue.registerElement('VideoPlayer', () => Video);

Vue.config.silent = (TNS_ENV === 'production');

new Vue({
    render(h) {
        return h(
            App,
            [
                h(Home, {slot: 'mainContent'})
            ]
        )
    },
    store,
}).$start();
