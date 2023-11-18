// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  try {
    if (req.method === "GET") {
      // Retrieve all users
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } else if (req.method === "POST") {
      // Create a new user
      const { acceptTerms, email, password, userName, phoneNumber } = req.body;
      await prisma.user.create({
        data: {
          acceptTerms,
          email,
          phoneNumber,
          userName,
          password,
        },
      });
      res.status(201).json({ message: "User Details Updated Successfully" });
    } else if (req.method === "DELETE") {
      await prisma.user.deleteMany();
      res.status(200).json({ message: "deleted" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error: any) {
    if (error.code === "P2002") {
      if (error.meta?.target) {
        const { target } = error.meta;
        console.log(target);
        if (target.includes("email") && target.includes("userName")) {
          res.status(400).json({
            emailErrorMessage: "Email Already Exists",
            userErrorMessage: "Username Already Exists",
          });
        } else if (target.includes("email")) {
          res.status(400).json({
            emailErrorMessage: "Email Already Exists",
            userErrorMessage: "",
          });
        } else if (target.includes("userName")) {
          res.status(400).json({
            emailErrorMessage: "",
            userErrorMessage: "Username Already Exists",
          });
        }
      } else {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}
