import { PrismaClient } from "@prisma/client";

declare global { // use for lib/PrismaDB.ts
    namespace globalThis {
        var prismadb: PrismaClient
    }
}