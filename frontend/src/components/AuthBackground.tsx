
import React from 'react';
import ParticlesBackground from './ParticlesBackground';

const AuthBackground = () => {
  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-wizard-dark via-wizard-secondary/20 to-wizard-dark" />
      <ParticlesBackground className="opacity-50" />
    </>
  );
};

export default AuthBackground;
