// src/components/ResponsiveTable.js

import React, { useEffect } from 'react';

const ResponsiveTable = ({ children }) => {
  useEffect(() => {
    if (window.innerWidth <= 768) {
      document.querySelectorAll('table').forEach((table) => {
        table.style.fontSize = '0.85rem';  // Smaller font size for mobile
        table.style.width = '100%';  // Ensure table fits within the screen
        table.style.tableLayout = 'fixed';  // Prevent table overflow
      });

      document.querySelectorAll('th, td').forEach((cell) => {
        cell.style.padding = '8px 6px';  // Adjust padding for smaller screens
      });

      document.querySelector('div').style.maxWidth = '100%';
    }
  }, []);

  return (
    <div style={{ overflowX: 'auto', marginTop: '2rem', marginBottom: '2rem' }}>
      {children}
    </div>
  );
};

export default ResponsiveTable;

