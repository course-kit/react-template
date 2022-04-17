import { Link, useParams } from 'react-router-dom'
import { useAsync } from 'react-async'
import { fetchCourseAndUser } from '../ck'
import Loading from '../components/Loading'
import LessonSummary from '../components/LessonSummary'
import CourseHeader from '../components/CourseHeader'
import Error from '../components/Error'

function Course() {
  let { courseId } = useParams()
  const { data, error, isPending } = useAsync({
    promiseFn: fetchCourseAndUser,
    courseId,
  })
  if (data) {
    const { course, user } = data
    const { title, lessons } = course
    return (
      <div className="Course page">
        <header>
          <p>
            <Link to={'/'}>Back to courses</Link>
          </p>
          <h1>{title}</h1>
          <CourseHeader course={course} user={user} />
        </header>
        <div>
          {lessons.map((lesson, index) => (
            <LessonSummary
              courseId={courseId}
              lesson={lesson}
              num={index + 1}
              key={lesson.id}
            />
          ))}
        </div>
      </div>
    )
  }
  if (error) {
    return <Error />
  }
  if (isPending) {
    return <Loading />
  }
}

export default Course
