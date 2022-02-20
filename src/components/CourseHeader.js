import { Link } from 'react-router-dom'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import EnrollFree from './EnrollFree'

function CourseHeader(props) {
  const nextLessonPath = `/courses/${props.course.id}/lessons/${props.course.nextLessonId}`
  const isFirstLesson = props.course.lessons[0].id === props.course.nextLessonId
  if (props.course.enrolled) {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: props.course.html }} />
        <Link className="button primary icon" to={nextLessonPath}>
          <span>{isFirstLesson ? 'Get started' : 'Continue'}</span>
          <ChevronDoubleRightIcon />
        </Link>
      </div>
    )
  } else {
    return (
      <EnrollFree
        courseId={props.course.id}
        text="Enroll now"
        classes="button primary icon"
      />
    )
  }
}

export default CourseHeader
