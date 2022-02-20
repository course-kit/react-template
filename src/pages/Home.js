import { useAsync } from 'react-async'
import { fetchCourseSummaries } from '../ck'
import Loading from '../components/Loading'
import CourseSummary from '../components/CourseSummary'

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
          <CourseSummary course={course} />
        ))}
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

export default Home
