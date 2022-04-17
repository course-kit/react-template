function LessonForbidden(props) {
  return (
    <div className="LessonNoAccess">
      <div>
        Please{' '}
        <span
          className="underline cursor-pointer"
          onClick={() => props.user.enrollRedirect(props.courseId)}
        >
          enroll
        </span>{' '}
        to view this lesson.
      </div>
    </div>
  )
}

export default LessonForbidden
