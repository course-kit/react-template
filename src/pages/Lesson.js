import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAsync } from "react-async"
import { fetchCourseLessonAndUser } from "../ck"
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import Vimeo from '@u-wave/react-vimeo'
import Enroll from "../components/Enroll";

function Lesson () {
  let { courseId, lessonId } = useParams()
  const navigate = useNavigate()
  const { data, error, isPending } = useAsync({ promiseFn: fetchCourseLessonAndUser, courseId, lessonId })
  if (data) {
    const { course, lesson, lessonStatus, user } = data
    const { title, html, meta } = lesson
    function VideoEmbed () {
      console.log(meta)
      if (meta.vimeoId) {
        return (
          <Vimeo video={meta.vimeoId} responsive />
        )
      } else {
        return (
          <div />
        )
      }
    }
    function Content () {
      if (lessonStatus === 401) {
        return (
          <div className="Lesson401">
            <div>
              Please <span className="underline cursor-pointer" onClick={user.loginRedirect}>log in</span> or <Enroll courseId={courseId} text="enroll" style="underline cursor-pointer" /> to view this lesson.
            </div>
          </div>
        )
      }
      if (lessonStatus === 403) {
        return (
          <div className="Lesson401">
            <div>
              Please <Enroll courseId={courseId} text="enroll" style="underline cursor-pointer" /> to view this lesson.
            </div>
          </div>
        )
      }
      if (lessonStatus === 200) {
        async function completeAndContinue() {
          const success = await lesson.markComplete()
          if (success) {
            const nextLessonId = course.nextLessonId
            navigate(`/courses/${course.id}/lessons/${nextLessonId}`)
          }
        }
        return (
          <div class="Content">
            <VideoEmbed />
            <div className="markdown" dangerouslySetInnerHTML={{__html: html}} />
            <button className="button-primary icon" onClick={completeAndContinue}>
              <span>Complete and continue</span>
              <ChevronDoubleRightIcon />
            </button>
          </div>
        )
      }
    }
    return (
      <div className="Lesson">
        <header>
          <p>
            <Link to={"/courses/" + course.id}>Back to {course.title}</Link>
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
    console.log(error)
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

export default Lesson
