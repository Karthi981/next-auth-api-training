import { updateStateAtom, updateCourseAtom } from "@/store";
import { useAtom } from "jotai";

interface Props {
  courses: CourseData[];
}

interface CourseData {
  id: string;
  CourseTitle: string;
  CourseSubscribers: string[];
  AuthorName: string;
}

const CourseGrid = ({ courses }: Props) => {
  const [updateAtomState, setUpdateAtom] = useAtom(updateStateAtom);
  const [courseData, setUpdateCourseData] = useAtom(updateCourseAtom);

  const handleCheckBoxChange = (course: CourseData) => {
    if (updateAtomState === false) {
      setUpdateCourseData({ ...courseData, id: "" });
      setUpdateAtom(!updateAtomState);
    } else {
      console.log(course.id);
      setUpdateCourseData(course);
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-2"></th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Course Title
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Author Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Course Subscribers
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {courses.map((course, index) => (
          <tr key={course.id}>
            <td className="px-2">
              <input
                id="checked-checkbox"
                type="checkbox"
                className="w-4 h-4 "
                checked={course.id === courseData.id}
                onChange={() => handleCheckBoxChange(course)}
              ></input>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{course.CourseTitle}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{course.AuthorName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <ul className="text-sm text-gray-900 flex flex-row gap-2">
                {course.CourseSubscribers.map((subscriber, subIndex) => (
                  <li key={subIndex}>{subscriber} ,</li>
                ))}
              </ul>
            </td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseGrid;
