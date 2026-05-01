function About() {
  return (
    <div className="about-container">
      <div className="hero-section">
        <h1 className="hero-title">About Us</h1>
        <p className="hero-subtitle">Learn more about LinkShrink and our mission.</p>
      </div>
      
      <div className="card content-card">
        <h2>Our Mission</h2>
        <p>
          At LinkShrink, we believe that sharing links should be simple and elegant. 
          Long, messy URLs can be distracting and difficult to share across platforms 
          with character limits. Our mission is to provide a fast, reliable, and 
          customizable way to make your links more manageable.
        </p>

        <h2>Features</h2>
        <ul className="features-list">
          <li>
            <strong>Lightning Fast:</strong> Generate short URLs instantly without any delays.
          </li>
          <li>
            <strong>Custom Aliases:</strong> Make your links memorable with custom text.
          </li>
          <li>
            <strong>Secure & Reliable:</strong> Your shortened links are always available when you need them.
          </li>
        </ul>

        <h2>The Lab 8 Project</h2>
        <p>
          This application was developed as part of Lab 8 for CPIT-405 Internet Applications.
          It demonstrates proficiency in React.js fundamentals including state management with hooks, 
          event handling, and client-side routing with React Router.
        </p>
      </div>
    </div>
  );
}

export default About;
