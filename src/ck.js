import { CourseKitClient } from '@coursekit/client';
const ck = new CourseKitClient({ schoolId: 'sc2tbvt3pl' });

const fetchUser = async () => {
  const { status, user } = await ck.loadUser();
  if (status === 500) throw new Error('Server error');
  return { status, user };
};

const fetchCourseSummaries = async () => {
  const { status, courses } = await ck.loadCourseSummaries();
  if (status === 500) throw new Error('Server error');
  return { courses, status };
};

const fetchCourse = async ({ courseId }) => {
  const { status, course } = await ck.loadCourse(courseId);
  if (status === 404 || status === 500) throw new Error('Server error');
  return { course, status };
};

const fetchLesson = async ({ courseId, lessonId }) => {
  const { status, lesson } = await ck.loadLesson(courseId, lessonId);
  if (status === 404 || status === 500) throw new Error('Server error');
  return { status, lesson };
};

const fetchCourseLessonAndUser = async ({ courseId, lessonId }) => {
  const result = await Promise.all([
    await fetchCourse({ courseId }),
    await fetchLesson({ courseId, lessonId }),
    await fetchUser(),
  ]);
  return {
    courseStatus: result[0].status,
    course: result[0].course,
    lessonStatus: result[1].status,
    lesson: result[1].lesson,
    userStatus: result[2].status,
    user: result[2].user,
  };
};

export {
  ck,
  fetchCourseSummaries,
  fetchCourse,
  fetchLesson,
  fetchCourseLessonAndUser,
  fetchUser,
};
