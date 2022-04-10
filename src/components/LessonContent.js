import { useNavigate, useParams } from 'react-router-dom'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import Vimeo from '@u-wave/react-vimeo'
import './LessonContent.css'
import { fetchLesson, fetchCourse } from '../ck'
import { useAsync } from 'react-async'
import Error from './Error'
import Loading from './Loading'

function LessonContent() {
  let { courseId, lessonId } = useParams()
  const navigate = useNavigate()
  const { data, error, isPending } = useAsync({
    promiseFn: fetchLesson,
    courseId,
    lessonId,
  })
  if (data) {
    const { lesson } = data
    const { html, meta } = lesson
    const { vimeoId } = meta
    function VideoEmbed() {
      if (vimeoId) {
        return <Vimeo video={vimeoId} responsive />
      } else {
        return <div />
      }
    }
    async function completeAndContinue() {
      const success = await lesson.markComplete()
      const { course } = await fetchCourse({ courseId })
      if (success) {
        const nextLessonId = course.nextLessonId
        if (nextLessonId) {
          navigate(`/courses/${course.id}/lessons/${nextLessonId}`)
        } else {
          navigate(`/courses/${course.id}`)
        }
      }
    }
    return (
      <div className="Content">
        <VideoEmbed />
        <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
        <button className="button primary icon" onClick={completeAndContinue}>
          <span>Complete and continue</span>
          <ChevronDoubleRightIcon />
        </button>
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

export default LessonContent
