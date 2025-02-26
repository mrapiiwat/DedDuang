import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1); // ออกจาก process ถ้าเชื่อมต่อไม่สำเร็จ
  }
};

connectDB();

export default prisma;
