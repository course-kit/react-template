function LessonUnauthorized(props) {
  return (
    <div className="LessonNoAccess">
      <div>
        Please{' '}
        <span
          className="underline cursor-pointer"
          onClick={() => props.user.loginRedirect({ courseId: props.courseId })}
        >
          log in
        </span>{' '}
        or{' '}
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

export default LessonUnauthorized
