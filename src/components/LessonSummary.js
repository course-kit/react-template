import { Link } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/solid'

function LessonSummary(props) {
  return (
    <section key={props.lesson.id} className="summary">
      <div>
        <div className="title">
          <h2>
            <Link
              className="no-underline cursor-pointer"
              to={'/courses/' + props.courseId + '/lessons/' + props.lesson.id}
            >
              {props.num}. {props.lesson.title}
            </Link>
          </h2>
          <CheckCircleIcon
            className={props.lesson.complete ? 'complete' : ''}
          />
        </div>
        <p>
          <Link
            className="no-underline cursor-pointer"
            to={'/courses/' + props.courseId + '/lessons/' + props.lesson.id}
          >
            {props.lesson.meta.description}
          </Link>
        </p>
      </div>
    </section>
  )
}

export default LessonSummary
