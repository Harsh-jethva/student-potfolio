function Footer({ email, copyrightOwner }) {
  const year = new Date().getFullYear()

  return (
    <footer className="section-copy footer-copy">
      <p className="eyebrow">Contact</p>
      <h2>Let&apos;s connect</h2>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>
        &copy; {year} {copyrightOwner}. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer