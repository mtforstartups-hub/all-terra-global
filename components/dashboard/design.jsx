import React from 'react';
import './design.css';

const ImpactSection = () => {
  return (
    <div className="impact-section">
      <h2 className="title">Designed for Value Creation</h2>

      <div className="impact-cards">

        {/* Founders Card */}
        <div className="impact-card" tabIndex={0} aria-label="Founders information">
          <div className="card-header">
            <span className="card-number">01</span>
            <h3>Founders</h3>
          </div>

          <p className="short-text">
            Build, scale and fund your startup with structured support.
          </p>

          <div className="hover-content">
            <ul>
              <li>Fractional Co-building</li>
              <li>Milestone execution</li>
              <li>Capital readiness</li>
              <li>Long-term partners</li>
            </ul>
          </div>
        </div>

        {/* Investors Card */}
        <div className="impact-card" tabIndex={0} aria-label="Investors information">
          <div className="card-header">
            <span className="card-number">02</span>
            <h3>Investors</h3>
          </div>

          <p className="short-text">
            Discover high-quality early-stage opportunities.
          </p>

          <div className="hover-content">
            <ul>
              <li>Transparency</li>
              <li>De-risked exposure</li>
              <li>Governance-first</li>
              <li>Exit frameworks</li>
            </ul>
          </div>
        </div>

        {/* Mentors & Advisors Card */}
        <div className="impact-card" tabIndex={0} aria-label="Mentors and Advisors information">
          <div className="card-header">
            <span className="card-number">03</span>
            <h3>Mentors & Advisors</h3>
          </div>

          <p className="short-text">
            Work with high-potential startups meaningfully.
          </p>

          <div className="hover-content">
            <ul>
              <li>Curated founders</li>
              <li>Structured roles</li>
              <li>Accountability</li>
              <li>Early-stage impact</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImpactSection;