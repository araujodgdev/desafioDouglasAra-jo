import { PrismaClient } from "@prisma/client";

class PrismaClientSingleton {
    private static instance: PrismaClient;

    private constructor() {
        return PrismaClientSingleton.instance;
    }

    static getInstance(): PrismaClient {
        if (!PrismaClientSingleton.instance) {
            PrismaClientSingleton.instance = new PrismaClient();
        }

        return PrismaClientSingleton.instance;
    }
}

export { PrismaClientSingleton };