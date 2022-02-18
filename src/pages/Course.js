import { Link, useParams } from 'react-router-dom'
import { useAsync } from "react-async"
import { fetchCourse } from "../ck"

function Course () {
  let { courseId } = useParams()
  const { data, error, isPending } = useAsync({ promiseFn: fetchCourse, courseId })
  if (data) {
    const { course } = data
    const { title, html, enrolled, lessons } = course
    console.log(html)
    return (
      <div className="Course">
        <header>
          <p>
            <Link to={"/"}>Back to courses</Link>
          </p>
          <h1>{ title }</h1>
          <p dangerouslySetInnerHTML={{__html: html}} />
        </header>
        <div>
          {lessons.map((lesson, index) => (
            <section key={lesson.id} className="LessonSummary">
              <h2><Link className="no-underline cursor-pointer" to={"/courses/" + courseId + "/lessons/" + lesson.id}>{index + 1}. {lesson.title}</Link></h2>
              <p><Link className="no-underline cursor-pointer" to={"/courses/" + courseId + "/lessons/" + lesson.id}>{lesson.meta.description}</Link></p>
            </section>
          ))}
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

export default Course
