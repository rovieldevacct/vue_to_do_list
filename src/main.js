import { createApp } from 'vue'
import './assets/custom.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import { library,dom } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faPhone);
// import store from './store/store'
dom.watch();

const app = createApp(App)
app.use(Toast)
.component("font-awesome-icon", FontAwesomeIcon)
app.config.compilerOptions.whitespace = 'preserve';
app.mount('#app')
