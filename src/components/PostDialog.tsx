import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PostCourse from "./PostCourse";
import { useAtom } from "jotai";
import { saveChangesAtom } from "@/store";

const PostDialog = () => {
  const [saveChanges, setSaveChanges] = useAtom(saveChangesAtom);
  return (
    <div>
      <Dialog open={saveChanges.addchange}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setSaveChanges({ ...saveChanges, addchange: true })}
            variant="outline"
          >
            Add Course
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white w-full ">
          <DialogHeader>
            <DialogTitle>Add Course to the Website</DialogTitle>
          </DialogHeader>
          <PostCourse />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostDialog;
