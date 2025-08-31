import React, {type ReactNode} from 'react';
// Remove the original Footer import if no longer needed, or keep if you need props from it.
// import Footer from '@theme-original/Footer'; 
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';
import Link from '@docusaurus/Link'; // Import Link for internal navigation
import useBaseUrl from '@docusaurus/useBaseUrl'; // Import useBaseUrl for static assets
import styles from './styles.module.css'; // Import CSS module

// Assuming WrapperProps might still be relevant if configuration is passed down
type Props = WrapperProps<typeof FooterType>; 

export default function FooterWrapper(props: Props): ReactNode {
  const logoUrl = useBaseUrl('/img/coinbyte_support.svg'); // Use the correct logo path if different
  const qrCodeUrl = useBaseUrl('/img/general/downloadqrcode.png');
  // Helper function to render link list items
  const renderLinkItem = (link: { href?: string; label: string }, index: number) => (
    <li key={index}>
      {link.href ? (
        <Link to={link.href.startsWith('/') ? useBaseUrl(link.href) : link.href}>
          {link.label}
        </Link>
      ) : (
        <a>{link.label}</a> // Render as plain text or non-navigable link if no href
      )}
    </li>
  );

// Footer link data based on provided HTML
  const footerLinks = {
    about: [
      { label: 'About us', href: 'https://coinbyte.com.au/en-us/about/' },
      { label: 'Contact us', href: 'https://coinbyte.com.au/en-us/contact/' },
      { label: 'Terms of service', href: 'https://support.coinbyte.com.au/docs/user-guide/legal/terms-of-service' },
      { label: 'Privacy Policy', href: 'https://support.coinbyte.com.au/docs/user-guide/legal/privacy-notice' },
      { label: 'Disclosures', href: 'https://support.coinbyte.com.au/docs/user-guide/legal/risk-disclosure-statement' },
      { label: 'KYC/AML Policy', href: 'https://support.coinbyte.com.au/docs/user-guide/legal/AML-CTF-Policy' },
      { label: 'Law enforcement', href: 'https://support.coinbyte.com.au/docs/user-guide/legal/law-enforcement-request-guide' },
      { label: 'Coinbyte app', href: 'https://coinbyte.com.au/en-us/download/' },
    ],
    products: [
      { label: 'Buy Crypto', href: 'https://coinbyte.com.au/en-us/retail/?isBuy=true' },
      { label: 'Sell Crypto', href: 'https://coinbyte.com.au/en-us/retail/?isBuy=false' },
      { label: 'Trade', href: 'https://coinbyte.com.au/en-us/exchange/' },
      { label: 'Recurring Buy', href: 'https://coinbyte.com.au/en-us/invest/list/' },
      { label: 'All Cryptocurrencies', href: 'https://coinbyte.com.au/en-us/markets/' },
      { label: 'Learn', href: 'https://coinbyte.com.au/en-us/learn/' },
    ],
    service: [
      { label: 'Referral', href: 'https://coinbyte.com.au/en-us/rebate/referral' },
      { label: 'API', href: 'https://coinbyte.com.au/en-us/user/api/' },
      { label: 'Fee schedule', href: 'https://coinbyte.com.au/en-us/fees/' },
    ],
    support: [
       { label: 'Support center', href: 'https://support.coinbyte.com.au/' }, // Assuming this is the help center base
       { label: 'Announcement', href: 'https://support.coinbyte.com.au/docs/announcements' },
       { label: 'Connect with Coinbyte', href: 'https://coinbyte.com.au/en-us/connect/' },
    ],
    buyCrypto: [
        { label: 'Buy Bitcoin', href: 'https://coinbyte.com.au/en-us/retail/btc_aud?isBuy=true' },
        { label: 'Buy Ethereum', href: 'https://coinbyte.com.au/en-us/retail/eth_aud?isBuy=true' },
        { label: 'Buy USDT', href: 'https://coinbyte.com.au/en-us/retail/usdt_aud?isBuy=true' },
        { label: 'Buy XRP', href: 'https://coinbyte.com.au/en-us/retail/xrp_aud?isBuy=true' },
        { label: 'Buy SOL', href: 'https://coinbyte.com.au/en-us/retail/sol_aud?isBuy=true' },
    ],
    sellCrypto: [
        { label: 'Sell Bitcoin', href: 'https://coinbyte.com.au/en-us/retail/btc_aud?isBuy=false' },
        { label: 'Sell Ethereum', href: 'https://coinbyte.com.au/en-us/retail/eth_aud?isBuy=false' },
        { label: 'Sell USDT', href: 'https://coinbyte.com.au/en-us/retail/usdt_aud?isBuy=false' },
        { label: 'Sell XRP', href: 'https://coinbyte.com.au/en-us/retail/xrp_aud?isBuy=false' },
        { label: 'Sell SOL', href: 'https://coinbyte.com.au/en-us/retail/sol_aud?isBuy=false' },
    ],
    trade: [
        { label: 'BTC/AUD', href: 'https://coinbyte.com.au/en-us/exchange/btc_aud?isBuy=true' }, 
{ label: 'ETH/AUD', href: 'https://coinbyte.com.au/en-us/exchange/eth_aud?isBuy=true' }, 
{ label: 'XRP/AUD', href: 'https://coinbyte.com.au/en-us/exchange/xrp_aud?isBuy=true' },
{ label: 'SOL/AUD', href: 'https://coinbyte.com.au/en-us/exchange/sol_aud?isBuy=true' },
        { label: 'BTC/NZD', href: 'https://coinbyte.com.au/en-us/exchange/btc_nzd?isBuy=true' }, 
{ label: 'ETH/NZD', href: 'https://coinbyte.com.au/en-us/exchange/eth_nzd?isBuy=true' }, 
        { label: 'XRP/NZD', href: 'https://coinbyte.com.au/en-us/exchange/xrp_nzd?isBuy=true' },
 { label: 'SOL/NZD', href: 'https://coinbyte.com.au/en-us/exchange/sol_nzd?isBuy=true' },
        { label: 'Bitcoin Price', href: 'https://coinbyte.com.au/en-us/exchange/btc_aud?isBuy=true' }, 
{ label: 'Ethereum Price', href: 'https://coinbyte.com.au/en-us/exchange/eth_aud?isBuy=true' },
 { label: 'XRP Price', href: 'https://coinbyte.com.au/en-us/exchange/xrp_aud?isBuy=true' },
        { label: 'Solana Price', href: 'https://coinbyte.com.au/en-us/exchange/sol_aud?isBuy=true' }, 
{ label: 'Doge Price', href: 'https://coinbyte.com.au/en-us/exchange/doge_aud?isBuy=true' }
    ]
  };
      
  const communityLinks = [
      { href: '#', iconClass: 'icon-community_twitter' },
      { href: '#', iconClass: 'icon-community_tiktok' },
      { href: '#', iconClass: 'icon-instragram' }, // Typo in original? instragram -> instagram?
      { href: '#', iconClass: 'icon-community_discord' },
      { href: '#', iconClass: 'icon-community_telegram' },
      { href: '#', iconClass: 'icon-community_facebook' },
      { href: '#', iconClass: 'icon-community_linkedin' }
  ];

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.wrapper}>
        {/* Brand and Language/Currency Selectors */}
        <div className={styles.footerTopSection}>
            <div className={styles.brand}>
                <div className={styles.img}>
                    <img width="133" src={logoUrl} alt="CoinByte Logo" />
                </div>
                <h4>© 2025 CoinByte. All rights reserved.</h4>
            </div>
        </div>


        {/* Main Links and QR Code Section */}
        <div className={styles.main}>
          <div className={styles.left}>
            <ul>
              <li className={styles.title}>About Coinbyte</li>
              {footerLinks.about.map(renderLinkItem)}
            </ul>
            <ul>
              <li className={styles.title}>Products</li>
              {footerLinks.products.map(renderLinkItem)}
            </ul>
            <ul>
              <li className={styles.title}>Service</li>
              {footerLinks.service.map(renderLinkItem)}
              <li className={`${styles.title} ${styles.titleWrapper}`}>Support</li>
              {footerLinks.support.map(renderLinkItem)}
            </ul>
             <ul>
                <li className={styles.title}>Buy Crypto</li>
                {footerLinks.buyCrypto.map(renderLinkItem)}
                <li className={`${styles.title} ${styles.titleWrapper}`}>Sell Crypto</li>
                {footerLinks.sellCrypto.map(renderLinkItem)}
             </ul>
             <ul>
                <li className={styles.title}>Trade</li>
                {footerLinks.trade.map(renderLinkItem)}
             </ul>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>
              Trade on the go with<br />COINBYTE
            </div>
            {/* Assuming register links to signup page */}
            <Link to={useBaseUrl('https://coinbyte.com.au/en-us/register/')} className={styles.registerBtn}> 
              Register
            </Link>
            <div className={styles.qrCode}>
              <img src={qrCodeUrl} className={styles.qrCodeImg} alt="Download CoinByte App QR Code" />
              <div className={styles.desc}>Scan to Download the CoinByte App</div>
            </div>
          </div>
        </div>

        {/* Community Links */}
        {/* <div className={styles.community}>
          <span>Community</span>
          {communityLinks.map((link, index) => (
            <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.iconClass}>
              <i className={`iconfont ${link.iconClass}`} /> 
            </a>
          ))}
        </div> */}

        {/* Copyright - Use config if available, otherwise hardcode */}
         <div className={styles.copyright}>
             Copyright © {new Date().getFullYear()} CoinByte. All rights reserved. 
             {/* Or potentially: {props.config.footer.copyright} if you want to use config */}
         </div>

      </div>
    </footer>
  );
}
