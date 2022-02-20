import EnrollFree from './EnrollFree';

function LessonUnauthorized(props) {
  return (
    <div className="LessonNoAccess">
      <div>
        Please{' '}
        <span
          className="underline cursor-pointer"
          onClick={props.user.loginRedirect}
        >
          log in
        </span>{' '}
        or{' '}
        <EnrollFree
          courseId={props.courseId}
          text="enroll"
          classes="underline cursor-pointer"
        />{' '}
        to view this lesson.
      </div>
    </div>
  );
}

export default LessonUnauthorized;
