import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Course from './pages/Course'
import Lesson from './pages/Lesson'
import Footer from './components/Footer'
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:courseId" element={<Course />} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<Lesson />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
