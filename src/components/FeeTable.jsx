// src/components/FeeTable.jsx
import React, { useState, useEffect } from 'react';

export default function FeeTable() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = e => setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 桌面端保持原有大小
  const baseFont = isMobile ? '0.78rem' : '0.95rem';
  const expFont  = isMobile ? '0.78rem' : '0.92rem';

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    tableLayout: isMobile ? 'fixed' : 'auto',
    fontSize: baseFont,
  };

  // 自定义列宽比例，移动端放大前两列
  const colTypeWidth = isMobile ? '24%' : '15%';
  const colFeeWidth  = isMobile ? '28%' : '20%';
  const colExpWidth  = isMobile ? '48%' : '65%';

  const thBase = {
    padding: isMobile ? '6px 5px' : '12px 10px',
    backgroundColor: '#01c19a',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 1.3,
    wordBreak: 'break-word',
  };

  const tdBase = {
    padding: isMobile ? '6px 5px' : '12px 10px',
    border: '1px solid #ddd',
    verticalAlign: 'middle',
    lineHeight: 1.4,
    wordBreak: 'break-word',
    whiteSpace: isMobile ? 'normal' : 'nowrap',
    textAlign: 'left',
    fontSize: expFont,
  };

  return (
    <div
      style={{
        marginTop: '2rem',
        marginBottom: '2rem',
        overflowX: isMobile ? 'hidden' : 'visible',
        maxWidth: '100%',
      }}
    >
      <table style={tableStyle}>
        <colgroup>
          <col style={{ width: colTypeWidth }} />
          <col style={{ width: colFeeWidth }} />
          <col style={{ width: colExpWidth }} />
        </colgroup>
        <thead>
          <tr>
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
