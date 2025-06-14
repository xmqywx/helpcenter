import React from 'react';
import './ListStyles.css';

const TickList = ({ children }) => {
  return <ul className="tick-list">{children}</ul>;
};
export default TickList;
