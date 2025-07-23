// src/components/FeeTable.jsx
import React, { useState, useEffect } from 'react';

export default function FeeTable() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    tableLayout: isMobile ? 'fixed' : 'auto',
    fontSize: isMobile ? '0.82rem' : '0.95rem',
  };

  const thBase = {
    padding: isMobile ? '8px 6px' : '12px 10px',
    backgroundColor: '#01c19a',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const tdBase = {
    padding: isMobile ? '8px 6px' : '12px 10px',
    border: '1px solid #ddd',
    verticalAlign: 'middle',
    whiteSpace: isMobile ? 'normal' : 'nowrap',   // 允许移动端换行
    wordBreak: 'break-word',
    textAlign: 'left',
    fontSize: isMobile ? '0.82rem' : '0.92rem',
  };

  return (
    <div style={{ marginTop: '2rem', marginBottom: '2rem', overflowX: 'hidden', maxWidth: '100%' }}>
      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: '#01c19a' }}>
            <th style={thBase}>Type</th>
            <th style={thBase}>Fee</th>
            <th style={{ ...thBase, textAlign: 'left' }}>Explanation</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: '#fff' }}>
            <td style={tdBase}>Spot Market</td>
            <td style={tdBase}>
              Taker: 0.1% + spread<br />Maker: 0.1% + spread
            </td>
            <td style={tdBase}>
              <strong>Fee for spot trading = Fee rate × Amount of crypto bought when order was filled.</strong><br /><br />
              Take USDT/USD as an example. If trader A (0.1% maker fee and 0.15% taker fee, spread is 0.02%) buys 1 USDT at the market price of 100 USD, trading fee = (0.15% + 0.02%) × 1 = 0.0017 USDT. A receives (1 - 0.0017) = 0.9983 USDT.<br /><br />
              If A sells 1 USDT at a limit price and buys 100 USD, A is the maker. The trading fee = (0.1% + 0.02%) × 100 = 0.12 USD. A receives (100 - 0.12) = 99.88 USD.<br /><br />
              <strong>Please note that we provide one of the lowest spreads, but the spread will vary based on the specific Crypto Asset and market liquidity.</strong>
            </td>
          </tr>
          <tr style={{ backgroundColor: '#f6fafa' }}>
            <td style={tdBase}>Instant Buy, Sell &amp; Swap</td>
            <td style={tdBase}>
              Buy: 0%<br />Sell: 0%<br />Swap: 0%
            </td>
            <td style={tdBase}>
              <strong>The same calculation applies as Spot Market trade.</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
