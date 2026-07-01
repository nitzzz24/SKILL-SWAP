// @ts-ignore
import { PrismaClient } from "@prisma/client/default";

let prismaInstance: PrismaClient | null = null;

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    if (!prismaInstance) {
      prismaInstance = new PrismaClient({
        log: ["query"],
      });
    }
    return Reflect.get(prismaInstance, prop, receiver);
  }
});
