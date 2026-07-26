function Spinner() {
  return (
    <div className="state-card spinner-card" role="status" aria-live="polite">
      <div className="spinner" />
      <p>Loading repositories...</p>
    </div>
  )
}

export default Spinner
