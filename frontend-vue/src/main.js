//import createApp from Vue
import { createApp } from "vue";
import "bootstrap-icons/font/bootstrap-icons.css";

//import component App
import App from "./App.vue";

//import config router
import routes from "./routes";

//create App Vue
const app = createApp(App);

//gunakan "router" di Vue dengan plugin "use"
app.use(routes);

app.mount("#app");
