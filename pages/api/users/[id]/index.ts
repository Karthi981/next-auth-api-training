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
    const userId = Array.isArray(idParam)
      ? parseInt(idParam[0], 10)
      : parseInt(idParam, 10);

    if (!isNaN(userId)) {
      if (req.method === "POST") {
        try {
          const { name, email, description, userName } = req.body;

          const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
              name,
              email,
              description,
              userName,
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
