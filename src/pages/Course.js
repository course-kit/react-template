import { Link, useParams } from 'react-router-dom'
import { useAsync } from 'react-async'
import { fetchCourse } from '../ck'
import Loading from '../components/Loading'
import LessonSummary from '../components/LessonSummary'
import CourseHeader from '../components/CourseHeader'

function Course() {
  let { courseId } = useParams()
  const { data, error, isPending } = useAsync({
    promiseFn: fetchCourse,
    courseId,
  })
  if (data) {
    const { course } = data
    const { title, lessons } = course
    return (
      <div className="Course page">
        <header>
          <p>
            <Link to={'/'}>Back to courses</Link>
          </p>
          <h1>{title}</h1>
          <CourseHeader course={course} />
        </header>
        <div>
          {lessons.map((lesson, index) => (
            <LessonSummary
              courseId={courseId}
              lesson={lesson}
              num={index + 1}
            />
          ))}
        </div>
      </div>
    )
  }
  if (error) {
    return <div>Error</div>
  }
  if (isPending) {
    return <Loading />
  }
}

export default Course
