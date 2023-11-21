import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveChangesAtom, updateCourseAtom } from "@/store";
import { useAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  CourseTitle: string;
  CourseSubscribers: string[];
  AuthorName: string;
};

const UpdateCourse = () => {
  const CourseData = useAtom(updateCourseAtom);
  const [saveChanges, setSaveChanges] = useAtom(saveChangesAtom);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: CourseData[0],
  });

  const onSubmit = handleSubmit((data: any) => {
    console.log(data);
    const updatedJsonData = {
      CourseTitle: data.CourseTitle,
      CourseSubscribers:
        typeof data.CourseSubscribers === "string"
          ? data.CourseSubscribers.split(",").map((s: string) => s.trim())
          : ["" + data.CourseSubscribers],
      AuthorName: data.AuthorName,
    };

    console.log("Submitted data:", updatedJsonData);

    UpdateData(updatedJsonData);
  });
  const UpdateData = async (Data: any) => {
    try {
      console.log(CourseData[0].id);
      const response = await fetch(
        "http://localhost:3000/api/courses/" + CourseData[0].id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );
      console.log(response);
      if (response.ok) {
        setSaveChanges({ ...saveChanges, updateChange: false });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">CourseTitle</Label>
          <Input
            {...register("CourseTitle")}
            id="CourseTitle"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            AuthorName
          </Label>
          <Input
            {...register("AuthorName")}
            id="AuthorName"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Subscribers
          </Label>
          <textarea
            {...register("CourseSubscribers")}
            id="CourseSubscribers"
            className="block p-2.5 w-64 h-32 border-black border-1"
            placeholder="Subscribers"
          ></textarea>
        </div>

        <div className="flex  flex-row justify-end">
          <div className="px-2">
            <Button
              variant={"outline"}
              type="submit"
              disabled={!watch("CourseTitle") || !watch("AuthorName")}
            >
              Update Course
            </Button>
          </div>
          <div className="px-2">
            <Button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                setSaveChanges({ ...saveChanges, updateChange: false })
              }
            >
              NO
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateCourse;
