// client/src/pages/TimelinePage.js

import React from 'react';
import { timelineEvents } from '../timelineData'; // Importa nossos dados
import './TimelinePage.css'; // Vamos criar o estilo a seguir

const TimelinePage = () => {
  return (
    <div className="timeline-page-container">
      <div className="timeline-header">
        <h1>Trajetória Artística</h1>
        <p>Uma jornada através dos anos, marcos e inspirações que moldaram a arte de Marcia Santos.</p>
      </div>
      <div className="timeline">
        {timelineEvents.map((event, index) => (
          <div key={event.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-year">{event.year}</div>
              <h3 className="timeline-title">{event.title}</h3>
              <p className="timeline-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelinePage;