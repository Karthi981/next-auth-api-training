import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { CourseTitle, CourseSubscribers, AuthorName } = req.body;

      const createdCourse = await prisma.courses.create({
        data: {
          CourseTitle,
          CourseSubscribers,
          AuthorName,
        },
      });

      res.status(201).json(createdCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const courses = await prisma.courses.findMany();
      res.status(200).json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
