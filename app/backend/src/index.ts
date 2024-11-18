import { App } from "./app.js";
import { router } from "./routes/index.js";

const app = new App(router);

app.start(Number(process.env.PORT) || 3000);