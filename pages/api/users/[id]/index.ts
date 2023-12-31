// pages/api/users/[id].js
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const idParam = req.query.id;

  if (idParam) {
    if (idParam) {
      if (req.method === "POST") {
        try {
          const { acceptTerms, email, password, userName, phoneNumber } =
            req.body;

          const updatedUser = await prisma.user.update({
            where: { id: idParam.toString() },
            data: {
              acceptTerms,
              email,
              phoneNumber,
              userName,
              password,
            },
          });

          res.status(200).json(updatedUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        } finally {
          await prisma.$disconnect();
        }
      } else {
        res.status(405).json({ message: "Method Not Allowed" });
      }
    } else {
      res.status(400).json({ message: "Invalid ID format" });
    }
  } else {
    res.status(400).json({ message: "Missing ID parameter" });
  }
}
