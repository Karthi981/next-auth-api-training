import { atom, useAtom } from "jotai";

const initialData = {
  id: "",
  CourseTitle: "",
  CourseSubscribers: [""],
  AuthorName: "",
};

const initialChanges = {
  addchange: false,
  updateChange: false,
  deleteChange: false,
};

const saveChangesAtom = atom(initialChanges);

const updateStateAtom = atom(false);

const updateCourseAtom = atom(initialData);

export { updateCourseAtom, updateStateAtom, saveChangesAtom };
