import { Link } from "react-router-dom"
import { useAsync } from "react-async"
import { fetchCourseSummaries } from "../ck"

function Home () {
  const { data, error, isPending } = useAsync(fetchCourseSummaries)
  if (data) {
    const { courses } = data
    return (
      <div>
        {courses.map(course => (
          <section key={course.id} className="CourseSummary">
            <h2><Link className="no-underline cursor-pointer" to={"/courses/" + course.id}>{course.title}</Link></h2>
            <p><Link className="no-underline cursor-pointer" to={"/courses/" + course.id}>{course.meta.description}</Link></p>
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
      <div>Loading...</div>
    )
  }
}

export default Home
