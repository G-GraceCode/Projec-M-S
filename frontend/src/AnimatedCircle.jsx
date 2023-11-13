import React from 'react';
import { Spinner } from 'react-bootstrap';

const AnimatedCircle = () => {
  return (
    <div className="text-center">
      <Spinner animation="border" role="status" aria-label="Loading...">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default AnimatedCircle;
