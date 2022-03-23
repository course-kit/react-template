import { useAsync } from 'react-async'
import { fetchCourseSummaries } from '../ck'
import Loading from '../components/Loading'
import CourseSummary from '../components/CourseSummary'
import Error from '../components/Error'

function Home() {
  const { data, error, isPending } = useAsync(fetchCourseSummaries)
  if (data) {
    const { courses } = data
    return (
      <div className="Home page">
        <header>
          <h1>CourseKit React Template</h1>
        </header>
        {courses.map((course) => (
          <CourseSummary course={course} key={course.id} />
        ))}
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

export default Home
