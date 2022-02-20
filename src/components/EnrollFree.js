import React from 'react';
import Modal from 'react-modal';
import {
  XIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/solid';
import './EnrollFree.css';

Modal.setAppElement('#root');

function EnrollFree(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setEmail('');
    setLoading(false);
    setError(false);
    setSubmitted(false);
  }

  async function handleSubmit(event) {
    const url = '/.netlify/functions/enroll';
    setLoading(true);
    try {
      const { status } = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, courseId: props.courseId }),
      });
      setSubmitted(true);
      if (status !== 200) {
        setError(true);
      }
    } catch (err) {
      setSubmitted(true);
      setError(true);
      console.log(err);
    }
    setLoading(false);
    event.preventDefault();
  }
  function Content() {
    if (submitted) {
      if (error) {
        return (
          <div className="alert error">
            <ExclamationCircleIcon />
            <span>Submission failed. Please try again later.</span>
          </div>
        );
      } else {
        return (
          <div className="alert success">
            <CheckCircleIcon />
            <span>
              Success! Please check your email to activate your course.
            </span>
          </div>
        );
      }
    } else {
      return (
        <div>
          <p>Please enter your email address to enroll in this course.</p>
          <div className="form">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              placeholder="Your email"
              autoFocus
            />
            <button className="button primary" onClick={handleSubmit}>
              <span>Submit</span>
              <span className={loading ? 'loading' : ''} />
            </button>
          </div>
        </div>
      );
    }
  }
  return (
    <span>
      <span onClick={openModal} className={props.classes}>
        {props.text}
      </span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Enroll"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="close">
          <XIcon onClick={closeModal} />
        </div>
        <Content />
      </Modal>
    </span>
  );
}

export default EnrollFree;
