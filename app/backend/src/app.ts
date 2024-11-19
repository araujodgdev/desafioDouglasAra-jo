import express, { Router } from 'express';
class App {
    public app: express.Express;

    constructor(router: Router) {
        this.app = express();
        this.config();
        this.app.use(router);
    }



    private config(): void {
        const accessControl: express.RequestHandler = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };

        this.app.use(express.json());
        this.app.use(accessControl);
    }


    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
export { App };