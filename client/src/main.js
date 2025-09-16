import { mount } from "svelte";
import App from "./App.svelte";

import "@picocss/pico/css/pico.css";
import "./assets/app.css";

const target = document.getElementById("app");
mount(App, { target });
