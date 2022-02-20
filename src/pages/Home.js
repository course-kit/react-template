import { Link } from "react-router-dom"
import { useAsync } from "react-async"
import { fetchCourseSummaries } from "../ck"
import { BookmarkIcon } from "@heroicons/react/outline";

function Home () {
  const { data, error, isPending } = useAsync(fetchCourseSummaries)
  if (data) {
    const { courses } = data
    return (
      <div className="Home">
        <header>
          <h1>CourseKit React Template</h1>
        </header>
        {courses.map(course => (
          <section key={course.id} className="CourseSummary">
            <div>
              <div className="title">
                <h2><Link className="no-underline cursor-pointer" to={"/courses/" + course.id}>{course.title}</Link></h2>
                <BookmarkIcon className={course.enrolled ? "enrolled" : ""}/>
              </div>
              <p><Link className="no-underline cursor-pointer" to={"/courses/" + course.id}>{course.meta.description}</Link></p>
            </div>
          </section>
        ))}
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
      <div className="spinner" />
    )
  }
}

export default Home
