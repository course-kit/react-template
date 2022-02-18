import { CourseKitClient } from '@coursekit/client'
const ck = new CourseKitClient({ schoolId: 'sc2tbvt3pl' })

const fetchUser = async () => {
  const { status, user } = await ck.loadUser()
  if (status === 500) throw new Error('Server error')
  return { status, user }
}

const fetchCourseSummaries = async () => {
  const { status, courses } = await ck.loadCourseSummaries()
  if (status === 500) throw new Error('Server error')
  return { courses }
}

const fetchCourse = async ({ courseId }) => {
  const { status, course } = await ck.loadCourse(courseId)
  if (status === 404 || status === 500) throw new Error('Server error')
  return { course }
}

const fetchLesson = async ({ courseId, lessonId }) => {
  const { status, lesson } = await ck.loadLesson(courseId, lessonId)
  if (status === 404 || status === 500) throw new Error('Server error')
  return { status, lesson }
}

const fetchUserAndLesson = async ({ courseId, lessonId }) => {
  const lessonResponse = await fetchLesson({ courseId, lessonId })
  const userResponse = await fetchUser()
  return {
    lessonStatus: lessonResponse.status,
    lesson: lessonResponse.lesson,
    userStatus: userResponse.status,
    user: userResponse.user
  }
}


export { ck, fetchCourseSummaries, fetchCourse, fetchLesson, fetchUserAndLesson }
