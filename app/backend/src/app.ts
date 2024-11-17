import express from 'express';

class App {
    public app: express.Express;

    constructor() {
        this.app = express();
        this.config();
    }

    private config():void {
        this.app.use(express.json());
    }

    public start(port: number):void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
export { App };