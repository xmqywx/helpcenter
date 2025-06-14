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
  const qrCodeUrl = "data:image/png;base64,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";
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
      { label: 'About us', href: '/zh-cn/about/' },
      { label: 'Contact us', href: '/zh-cn/contact/' },
      { label: 'Terms of service', href: '/zh-cn/terms-of-service/' },
      { label: 'Privacy Notice', href: '/zh-cn/privacy-policy/' },
      { label: 'Disclosures', href: '/zh-cn/disclosures/' },
      { label: 'KYC/AML Policy', href: '/zh-cn/kyc/' },
      { label: 'Law enforcement', href: '/zh-cn/law/' },
      { label: 'Coinbyte app', href: '/zh-cn/app/' },
    ],
    products: [
      { label: 'Buy Crypto', href: '/zh-cn/retail/?isBuy=true' },
      { label: 'Sell Crypto', href: '/zh-cn/retail/?isBuy=false' },
      { label: 'About Invest', href: '/zh-cn/invest/' },
      { label: 'Trade', href: '/zh-cn/exchange/' },
      { label: 'Earn', href: '/zh-cn/earn/' },
      { label: 'All Cryptocurrencies', href: '/zh-cn/chart/' },
      { label: 'Learn', href: '/zh-cn/learn/' },
    ],
    service: [
      { label: 'Referral', href: '/zh-cn/rebate/test1' },
      { label: 'API', href: '/zh-cn/user/api/' },
      { label: 'Fee schedule', href: '/zh-cn/fees/' },
    ],
    support: [
       { label: 'Support center', href: '/zh-cn/support-center/' }, // Assuming this is the help center base
       { label: 'Announcement', href: '/zh-cn/announcement/' },
       { label: 'Connect with Coinbyte', href: '/zh-cn/connect/' },
    ],
    buyCrypto: [
        { label: 'Buy Bitcoin' },
        { label: 'Buy Ethereum' },
        { label: 'Buy USDT' },
        { label: 'Buy XRP' },
        { label: 'Buy SOL' },
    ],
    sellCrypto: [
        { label: 'Sell Bitcoin' },
        { label: 'Sell Ethereum' },
        { label: 'Sell USDT' },
        { label: 'Sell XRP' },
        { label: 'Sell SOL' },
    ],
    trade: [
        { label: 'BTC / AUD' }, { label: 'ETH / AUD' }, { label: 'SOL / AUD' },
        { label: 'BTC / NZD' }, { label: 'ETH / NZE' }, // Typo in original? NZE -> NZD?
        { label: 'XRP / NZD' }, { label: 'SOL / NZD' },
        { label: 'Bitcoin Price' }, { label: 'Ethereum Price' }, { label: 'XRP Price' },
        { label: 'Solana Price' }, { label: 'Doge Price' }
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
                <h4>@2024 CoinByte.com</h4>
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
             {/* <ul>
                <li className={styles.title}>Trade</li>
                {footerLinks.trade.map(renderLinkItem)}
             </ul> */}
          </div>
          <div className={styles.right}>
            <div className={styles.title}>
              Trade on the go with<br />COINBYTE
            </div>
            {/* Assuming register links to signup page */}
            <Link to={useBaseUrl('/signup')} className={styles.registerBtn}> 
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
