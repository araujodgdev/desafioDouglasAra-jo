import { App } from "./app.js";

const app = new App();

app.app.get('/', (req, res) => {
    res.send({
        message: 'Hello World!'
    });
});

app.start(Number(process.env.PORT) || 3000);