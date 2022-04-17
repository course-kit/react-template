import { Link, useParams } from 'react-router-dom'
import { useAsync } from 'react-async'
import { fetchCourseLessonAndUser } from '../ck'
import LessonUnauthorized from '../components/LessonUnauthorized'
import LessonForbidden from '../components/LessonForbidden'
import '../components/LessonNoAccess.css'
import LessonContent from '../components/LessonContent'
import Loading from '../components/Loading'
import Error from '../components/Error'

function Lesson() {
  let { courseId, lessonId } = useParams()
  const { data, error, isPending } = useAsync({
    watch: lessonId,
    promiseFn: fetchCourseLessonAndUser,
    courseId,
    lessonId,
  })
  if (data) {
    const { course, lesson, lessonStatus, user } = data
    const { title } = lesson
    function Content() {
      if (lessonStatus === 401) {
        return <LessonUnauthorized courseId={courseId} user={user} />
      }
      if (lessonStatus === 403) {
        return <LessonForbidden courseId={courseId} user={user} />
      }
      if (lessonStatus === 200) {
        return <LessonContent course={course} lesson={lesson} />
      }
    }
    return (
      <div className="Lesson page">
        <header>
          <p>
            <Link to={'/courses/' + course.id}>Back to {course.title}</Link>
          </p>
          <h1>{title}</h1>
        </header>
        <div>
          <Content />
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

export default Lesson
