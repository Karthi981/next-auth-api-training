import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateCourse from "./UpdateCourse";
import { useAtom } from "jotai";
import { saveChangesAtom, updateCourseAtom, updateStateAtom } from "@/store";

const UpdateDialog = () => {
  const [courseData, setUpdateCourseData] = useAtom(updateCourseAtom);
  const [saveChanges, setSaveChanges] = useAtom(saveChangesAtom);
  return (
    <div>
      <Dialog open={saveChanges.updateChange}>
        <DialogTrigger asChild>
          <Button
            onClick={() =>
              setSaveChanges({ ...saveChanges, updateChange: true })
            }
            disabled={courseData.id === "" ? true : false}
            variant="outline"
          >
            Update Course
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white w-full ">
          <DialogHeader>
            <DialogTitle>Update The Course </DialogTitle>
          </DialogHeader>
          <UpdateCourse />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateDialog;
