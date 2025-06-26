import React from 'react';
import PropTypes from 'prop-types';

export default function CoinByteButton({ text, link }) {
  const themeColor = '#01c99a';

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem',
      marginBottom: '2rem',
    },
    base: {
      display: 'inline-block',
      padding: '0.6rem 1.4rem',
      border: `1.5px solid ${themeColor}`,
      borderRadius: '6px',
      backgroundColor: 'transparent',
      color: themeColor,
      fontWeight: '500',
      fontSize: '1rem',
      textAlign: 'center',
      textDecoration: 'none',
      transition: 'all 0.25s ease',
    },
    hover: {
      backgroundColor: themeColor,
      color: '#ffffff',
    },
  };

  const [hovered, setHovered] = React.useState(false);

  return (
    <div style={styles.wrapper}>
      <a
        href={link}
        style={hovered ? { ...styles.base, ...styles.hover } : styles.base}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {text}
      </a>
    </div>
  );
}

CoinByteButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
