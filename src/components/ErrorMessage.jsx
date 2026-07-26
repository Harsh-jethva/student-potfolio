function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-card error-card">
      <p>{message}</p>
      {onRetry ? (
        <button className="retry-button" onClick={onRetry} type="button">
          Try again
        </button>
      ) : null}
    </div>
  )
}

export default ErrorMessage
