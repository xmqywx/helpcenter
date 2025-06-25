import React from 'react';
import PropTypes from 'prop-types';

export default function CoinByteButton({ text, link }) {
  const themeColor = '#01c99a';

  return (
    <a
      href={link}
      style={{
        display: 'inline-block',
        justifyContent: 'center',
        padding: '0.6rem 1.2rem',
        border: `1.5px solid ${themeColor}`,
        borderRadius: '6px',
        color: themeColor,
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: '1rem',
        textAlign: 'center',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#e6f8f3';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = 'transparent';
      }}
    >
      {text}
    </a>
  );
}

CoinByteButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
