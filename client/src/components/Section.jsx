import React from 'react';

const Section = ({ title, children, className }) => {
  return (
    <div className={`section-container mb-24 mt-0 mx-4 ${className}`}>
      {title && <h2 className="section-title text-2xl font-bold mb-6 ml-4 font-serif">{title}</h2>}
      {children}
      <hr className="section-divider w-full my-12 border-gray-300" />
    </div>
  );
};

export default Section;
