import './Error.css'

function Error() {
  return (
    <div className="Error">
      <div>
        <h1>500 Error</h1>
        <p>
          If you're the developer of this school, ensure that your CourseKit
          account is active and correctly connected.
        </p>
        <a href="https://dashboard.coursekit.dev">Go to CourseKit dashboard</a>
      </div>
    </div>
  )
}

export default Error
