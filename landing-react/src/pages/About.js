import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Our Mission</h1>
          <p>
            We're dedicated to transforming dementia care through intelligent technology, 
            empowering caregivers and improving quality of life for patients.
          </p>
        </div>
      </section>

      <section className="mission-section section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Why We Built This</h2>
              <p>
                Dementia affects millions of families worldwide, creating challenges that 
                extend beyond medical care. Caregivers face overwhelming responsibilities, 
                while patients struggle with independence and safety.
              </p>
              <p>
                We recognized the need for a comprehensive solution that combines modern 
                technology with compassionate care. Our platform leverages AI and machine 
                learning to provide intelligent support while maintaining the human touch 
                that's essential in healthcare.
              </p>
            </div>
            <div className="mission-visual"></div>
          </div>
        </div>
      </section>

      <section className="values-section section" style={{background: 'var(--bg-light)'}}>
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>Principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="card value-card">
                <div className="value-icon"></div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const values = [
  {
    title: 'Compassion First',
    description: 'Every feature is designed with empathy, understanding the emotional and practical challenges of dementia care.'
  },
  {
    title: 'Innovation',
    description: 'We leverage cutting-edge AI and technology to solve real-world healthcare challenges.'
  },
  {
    title: 'Accessibility',
    description: 'Our platform is designed to be intuitive and accessible for users of all technical abilities.'
  },
  {
    title: 'Privacy & Security',
    description: 'We prioritize data protection and maintain the highest standards of healthcare privacy.'
  },
  {
    title: 'Continuous Improvement',
    description: 'We constantly evolve based on user feedback and the latest research in dementia care.'
  },
  {
    title: 'Collaboration',
    description: 'We work closely with healthcare professionals, caregivers, and families to create meaningful solutions.'
  }
];

export default About;
