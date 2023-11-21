import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAtom } from "jotai";
import { saveChangesAtom, updateCourseAtom, updateStateAtom } from "@/store";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/router";

const DeleteCourse = () => {
  const [courseData, setUpdateCourseData] = useAtom(updateCourseAtom);
  const [saveChanges, setSaveChanges] = useAtom(saveChangesAtom);
  const DeleteData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/courses/" + courseData.id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        setSaveChanges({ ...saveChanges, deleteChange: false });
        setUpdateCourseData({ ...courseData, id: "" });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Dialog open={saveChanges.deleteChange}>
        <DialogTrigger asChild>
          <Button
            onClick={() =>
              setSaveChanges({ ...saveChanges, deleteChange: true })
            }
            disabled={courseData.id === "" ? true : false}
            variant="outline"
          >
            Delete Course
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white w-full ">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium flex flex-col">
              <h1> Are you sure you want to delete the course</h1>
              <h2 className="text-red-400">{courseData.CourseTitle}?</h2>
            </DialogTitle>
          </DialogHeader>
          <div className="flex  flex-row justify-end">
            <div className="px-2">
              <Button
                className="bg-red-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={DeleteData}
              >
                Yes
              </Button>
            </div>
            <div className="px-2">
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  setSaveChanges({ ...saveChanges, deleteChange: false })
                }
              >
                NO
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteCourse;
