import EnrollFree from './EnrollFree'

function LessonForbidden(props) {
  return (
    <div className="LessonNoAccess">
      <div>
        Please{' '}
        <EnrollFree
          courseId={props.courseId}
          text="enroll"
          classes="underline cursor-pointer"
        />{' '}
        to view this lesson.
      </div>
    </div>
  )
}

export default LessonForbidden
