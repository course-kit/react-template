import { useNavigate } from 'react-router-dom';
import { ChevronDoubleRightIcon } from '@heroicons/react/solid';
import Vimeo from '@u-wave/react-vimeo';
import './LessonContent.css';

function LessonContent(props) {
  const navigate = useNavigate();
  const { html, meta } = props.lesson;
  const { vimeoId } = meta;
  function VideoEmbed() {
    if (vimeoId) {
      return <Vimeo video={meta.vimeoId} responsive />;
    } else {
      return <div />;
    }
  }
  async function completeAndContinue() {
    const success = await props.lesson.markComplete();
    if (success) {
      const nextLessonId = props.course.nextLessonId;
      navigate(`/courses/${props.course.id}/lessons/${nextLessonId}`);
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
  );
}

export default LessonContent;
