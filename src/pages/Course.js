import { Link, useParams } from 'react-router-dom';
import { useAsync } from 'react-async';
import { fetchCourse } from '../ck';
import {
  CheckCircleIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid';
import EnrollFree from '../components/EnrollFree';

function Course() {
  let { courseId } = useParams();
  const { data, error, isPending } = useAsync({
    promiseFn: fetchCourse,
    courseId,
  });
  if (data) {
    const { course } = data;
    const { title, html, enrolled, lessons, nextLessonId } = course;
    const nextLessonPath = `/courses/${courseId}/lessons/${nextLessonId}`;
    const isFirstLesson = lessons[0].id === nextLessonId;
    function HeaderContent() {
      if (enrolled) {
        return (
          <div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <Link className="button primary icon" to={nextLessonPath}>
              <span>{isFirstLesson ? 'Get started' : 'Continue'}</span>
              <ChevronDoubleRightIcon />
            </Link>
          </div>
        );
      } else {
        return (
          <EnrollFree
            courseId={courseId}
            text="Enroll now"
            classes="button primary icon"
          />
        );
      }
    }
    return (
      <div className="Course page">
        <header>
          <p>
            <Link to={'/'}>Back to courses</Link>
          </p>
          <h1>{title}</h1>
          <HeaderContent />
        </header>
        <div>
          {lessons.map((lesson, index) => (
            <section key={lesson.id} className="summary">
              <div>
                <div className="title">
                  <h2>
                    <Link
                      className="no-underline cursor-pointer"
                      to={'/courses/' + courseId + '/lessons/' + lesson.id}
                    >
                      {index + 1}. {lesson.title}
                    </Link>
                  </h2>
                  <CheckCircleIcon
                    className={lesson.complete ? 'complete' : ''}
                  />
                </div>
                <p>
                  <Link
                    className="no-underline cursor-pointer"
                    to={'/courses/' + courseId + '/lessons/' + lesson.id}
                  >
                    {lesson.meta.description}
                  </Link>
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }
  if (isPending) {
    return <div className="spinner" />;
  }
}

export default Course;
