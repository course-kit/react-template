import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Course from './pages/Course'
import Lesson from './pages/Lesson'
import Footer from './components/Footer'
import Nav from './components/Nav'
import { useAsync } from 'react-async'
import { fetchUser } from './ck'
import Error from './components/Error'

function App() {
  const { data, error, isPending } = useAsync(fetchUser)
  if (data) {
    return (
      <div className="App">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses/:courseId" element={<Course />} />
            <Route
              path="/courses/:courseId/lessons/:lessonId"
              element={<Lesson />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    )
  }
  if (error) {
    return (
      <div className="App">
        <Nav />
        <main>
          <Error />
        </main>
      </div>
    )
  }
  if (isPending) {
    return <div className="spinner" />
  }
}

export default App
