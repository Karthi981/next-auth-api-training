import CourseGrid from "@/src/components/CorseGrid";
import DeleteCourse from "@/src/components/DeleteCourse";
import PostDialog from "@/src/components/PostDialog";
import UpdateDialog from "@/src/components/UpdateCourseDialog";
import { saveChangesAtom } from "@/store";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

interface CourseData {
  id: string;
  CourseTitle: string;
  CourseSubscribers: string[];
  AuthorName: string;
  CourseCreatedAt: string;
}
const CoursesPage = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [saveChanges, setSaveChanges] = useAtom(saveChangesAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/courses");
        const data: CourseData[] = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [saveChanges]);
  return (
    <div className="min-h-screen w-full  py-4">
      <div className="flex flex-row">
        <div className="px-2 py-2">
          <PostDialog />
        </div>
        <div className="px-2 py-2">
          <UpdateDialog />
        </div>
        <div className="px-2 py-2">
          <DeleteCourse />
        </div>
      </div>

      <div className="container mx-auto mt-8">
        <CourseGrid courses={courses} />
      </div>
    </div>
  );
};

export default CoursesPage;
