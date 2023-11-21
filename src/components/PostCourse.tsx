import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveChangesAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
type FormData = {
  CourseTitle: string;
  CourseSubscribers: string;
  AuthorName: string;
};

const PostCourse = () => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const [saveChanges, setSaveChanges] = useAtom(saveChangesAtom);
  const onSubmit = handleSubmit((data: FormData) => {
    console.log(data);
    const updatedJsonData = {
      CourseTitle: data.CourseTitle,
      CourseSubscribers: data.CourseSubscribers.split(",").map((s: any) =>
        s.trim()
      ),
      AuthorName: data.AuthorName,
    };

    console.log("Submitted data:", updatedJsonData);

    PostData(updatedJsonData);
  });

  const PostData = async (Data: any) => {
    try {
      const response = await fetch("http://localhost:3000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      if (response.ok) {
        setSaveChanges({ ...saveChanges, addchange: false });
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
              Submit
            </Button>
          </div>
          <div className="px-2">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() =>
                setSaveChanges({ ...saveChanges, addchange: false })
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

export default PostCourse;
