import { Link, useParams } from 'react-router-dom'
import { useAsync } from "react-async"
import { fetchUserAndLesson } from "../ck"

function Lesson () {
  let { courseId, lessonId } = useParams()
  const { data, error, isPending } = useAsync({ promiseFn: fetchUserAndLesson, courseId, lessonId })
  if (data) {
    const { lesson, lessonStatus, user, userStatus } = data
    const { title, html, enrolled } = lesson
    console.log(lesson)
    function Content () {
      if (lessonStatus === 401) {
        return (
          <div>Please <button onClick={user.loginRedirect}>log in</button> or enroll to view this lesson</div>
        )
      }
      if (lessonStatus === 200) {
        return (
          <div dangerouslySetInnerHTML={{__html: html}} />
        )
      }
    }
    return (
      <div>
        <header>
          <p>
            <Link to={"/"}>Back to courses</Link>
          </p>
          <h1>{ title }</h1>
        </header>
        <div>
          <Content />
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div>Error</div>
    )
  }
  if (isPending) {
    return (
      <div>Loading...</div>
    )
  }
}

export default Lesson
