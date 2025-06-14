import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface Document {
  id: string;
  title: string;
  description?: string;
  permalink: string;
  frontMatter?: {
    description?: string;
    sidebar_position?: number;
  };
}

interface RelatedArticlesProps {
  category?: string;
}

interface DocsPluginData {
  docs?: Record<string, Document>;
}

/**
 * Related articles component - displays all documents under a specific category
 */
export default function RelatedArticles({ category }: RelatedArticlesProps): React.ReactNode {
  const location = useLocation();
  const [relatedDocs, setRelatedDocs] = useState<Document[]>([]);
  const { siteConfig } = useDocusaurusContext();
  
  // Fallback data for different categories
  const fallbackData: Record<string, Document[]> = {
    'account-security': [
      {
        id: 'account-security/register-account',
        title: 'Register a CoinByte Account',
        permalink: '/helpcenter/docs/account-security/create-coinbyte-account/register-a-coinbyte-account',
      },
      {
        id: 'account-security/two-factor-authentication',
        title: 'Set up Two-Factor Authentication',
        permalink: '/helpcenter/docs/account-security/verification-and-security/set-up-two-factor-authentication',
      },
      {
        id: 'account-security/kyc-verification',
        title: 'Complete Your KYC Verification',
        permalink: '/helpcenter/docs/account-security/verification-and-security/complete-your-KYC-verification-(individual-account)',
      },
      {
        id: 'account-security/verify-email',
        title: 'Verify Your Email',
        permalink: '/helpcenter/docs/account-security/verification-and-security/verify-your-email',
      },
      {
        id: 'account-security/verify-phone',
        title: 'Verify Your Phone Number',
        permalink: '/helpcenter/docs/account-security/verification-and-security/verify-your-phone-number',
      },
      {
        id: 'account-security/password-reset',
        title: 'Reset or Change Your Password',
        permalink: '/helpcenter/docs/account-security/update-details/reset-or-change-your-password',
      }
    ],
    'trading': [
      {
        id: 'trading/spot-trade',
        title: 'Spot Trading',
        permalink: '/helpcenter/docs/trading/exchange/spot-trade',
      },
      {
        id: 'trading/market-order',
        title: 'Market Orders',
        permalink: '/helpcenter/docs/trading/exchange/market-order',
      },
      {
        id: 'trading/limit-order',
        title: 'Limit Orders',
        permalink: '/helpcenter/docs/trading/exchange/limit-order',
      },
      {
        id: 'trading/instant-buy-crypto',
        title: 'Instant Buy Crypto',
        permalink: '/helpcenter/docs/trading/instant-buy-sell/instant-buy-crypto',
      },
      {
        id: 'trading/instant-sell-crypto',
        title: 'Instant Sell Crypto',
        permalink: '/helpcenter/docs/trading/instant-buy-sell/instant-sell-crypto',
      },
      {
        id: 'trading/manage-your-trade',
        title: 'Manage Your Trade',
        permalink: '/helpcenter/docs/trading/manage-your-trade',
      }
    ],
    'spot-trade': [
      {
        id: 'trading/spot-trade',
        title: 'Spot Trading',
        permalink: '/helpcenter/docs/trading/exchange/spot-trade',
      },
      {
        id: 'trading/market-order',
        title: 'Market Orders',
        permalink: '/helpcenter/docs/trading/exchange/market-order',
      },
      {
        id: 'trading/limit-order',
        title: 'Limit Orders',
        permalink: '/helpcenter/docs/trading/exchange/limit-order',
      },
      {
        id: 'trading/spread',
        title: 'Understanding Spread',
        permalink: '/helpcenter/docs/trading/FAQ/spread',
      }
    ],
    'deposits-withdrawals': [
      {
        id: 'deposits-withdrawals/deposit-crypto',
        title: 'Deposit Crypto',
        permalink: '/helpcenter/docs/deposits-withdrawals/deposit-crypto',
      },
      {
        id: 'deposits-withdrawals/withdraw-crypto',
        title: 'Withdraw Crypto',
        permalink: '/helpcenter/docs/deposits-withdrawals/withdraw-crypto',
      },
      {
        id: 'deposits-withdrawals/deposit-fiat',
        title: 'Deposit Fiat Currency',
        permalink: '/helpcenter/docs/deposits-withdrawals/deposit-fiat-asset',
      },
      {
        id: 'deposits-withdrawals/withdraw-fiat',
        title: 'Withdraw Fiat Currency',
        permalink: '/helpcenter/docs/deposits-withdrawals/withdraw-fiat-asset',
      },
      {
        id: 'deposits-withdrawals/fees',
        title: 'Deposit & Withdrawal Fees',
        permalink: '/helpcenter/docs/deposits-withdrawals/FAQ/crypto-asset-deposit-withdrawal-fee',
      },
      {
        id: 'deposits-withdrawals/link-bank-account',
        title: 'Link a Bank Account',
        permalink: '/helpcenter/docs/deposits-withdrawals/withdraw-fiat-asset/link-a-bank-account',
      }
    ],
    'deposits-and-withdrawals': [
      {
        id: 'deposits-withdrawals/deposit-crypto',
        title: 'Deposit Crypto',
        permalink: '/helpcenter/docs/deposits-withdrawals/deposit-crypto',
      },
      {
        id: 'deposits-withdrawals/withdraw-crypto',
        title: 'Withdraw Crypto',
        permalink: '/helpcenter/docs/deposits-withdrawals/withdraw-crypto',
      },
      {
        id: 'deposits-withdrawals/direct-deposit',
        title: 'Direct Deposit',
        permalink: '/helpcenter/docs/deposits-withdrawals/deposit-fiat-asset/direct-deposit',
      },
      {
        id: 'deposits-withdrawals/fees',
        title: 'Deposit & Withdrawal Fees',
        permalink: '/helpcenter/docs/deposits-withdrawals/FAQ/crypto-asset-deposit-withdrawal-fee',
      }
    ],
    'deposit-crypto': [
      {
        id: 'deposits-withdrawals/deposit-crypto-to-coinbyte',
        title: 'Deposit Crypto to CoinByte',
        permalink: '/helpcenter/docs/deposits-withdrawals/deposit-crypto/deposit-crypto',
      },
      {
        id: 'deposits-withdrawals/deposit-from-exchange',
        title: 'Deposit from Other Exchange or Wallet',
        permalink: '/helpcenter/docs/deposits-withdrawals/deposit-crypto/deposit-from-other-exchange-or-wallet',
      },
      {
        id: 'deposits-withdrawals/update-deposit-address',
        title: 'Update Your CoinByte Deposit Address',
        permalink: '/helpcenter/docs/deposits-withdrawals/deposit-crypto/update-your-coinByte-deposit-address',
      },
      {
        id: 'deposits-withdrawals/network-selection',
        title: 'Selecting a Network for Crypto Transfer',
        permalink: '/helpcenter/docs/deposits-withdrawals/withdraw-crypto/Selecting-a-network-for-crypto-transfer',
      }
    ],
    'network-and-fees': [
      {
        id: 'deposits-withdrawals/network-selection',
        title: 'Selecting a Network for Crypto Transfer',
        permalink: '/helpcenter/docs/deposits-withdrawals/withdraw-crypto/Selecting-a-network-for-crypto-transfer',
      },
      {
        id: 'deposits-withdrawals/withdrawal-fees',
        title: 'Withdrawal Network Fees',
        permalink: '/helpcenter/docs/deposits-withdrawals/withdraw-crypto/withdrawal-network-fees',
      },
      {
        id: 'deposits-withdrawals/crypto-fees',
        title: 'Crypto Asset Deposit & Withdrawal Fees',
        permalink: '/helpcenter/docs/deposits-withdrawals/FAQ/crypto-asset-deposit-withdrawal-fee',
      }
    ],
    'user-guide': [
      {
        id: 'user-guide/about-coinbyte',
        title: 'About CoinByte',
        permalink: '/helpcenter/docs/user-guide/about-coinbyte',
      },
      {
        id: 'user-guide/trading-fee-structure',
        title: 'Trading Fee Structure',
        permalink: '/helpcenter/docs/user-guide/about-coinbyte/trading-fee-structure',
      },
      {
        id: 'user-guide/contact-team',
        title: 'Contact Our Team',
        permalink: '/helpcenter/docs/user-guide/about-coinbyte/Contact-to-our-team',
      },
      {
        id: 'user-guide/tools',
        title: 'Tools & Features',
        permalink: '/helpcenter/docs/user-guide/tools',
      }
    ],
    'legal': [
      {
        id: 'user-guide/legal/terms-of-service',
        title: 'Terms of Service',
        permalink: '/helpcenter/docs/user-guide/legal/terms-of-service',
      },
      {
        id: 'user-guide/legal/privacy-notice',
        title: 'Privacy Notice',
        permalink: '/helpcenter/docs/user-guide/legal/privacy-notice',
      },
      {
        id: 'user-guide/legal/risk-disclosure',
        title: 'Risk Disclosure Statement',
        permalink: '/helpcenter/docs/user-guide/legal/risk-disclosure-statement',
      },
      {
        id: 'user-guide/legal/aml-ctf-policy',
        title: 'AML/CTF Policy',
        permalink: '/helpcenter/docs/user-guide/legal/aml-ctf-policy',
      },
      {
        id: 'user-guide/legal/law-enforcement',
        title: 'Law Enforcement Request Guide',
        permalink: '/helpcenter/docs/user-guide/legal/law-enforcement-request-guide',
      }
    ],
    'tools': [
      {
        id: 'user-guide/tools/app-notification',
        title: 'App Notification',
        permalink: '/helpcenter/docs/user-guide/tools/app-notification',
      },
      {
        id: 'user-guide/tools/transaction-history',
        title: 'Transaction History',
        permalink: '/helpcenter/docs/user-guide/tools/transaction-history',
      }
    ],
    'account-management': [
      {
        id: 'user-guide/tools/transaction-history',
        title: 'Transaction History',
        permalink: '/helpcenter/docs/user-guide/tools/transaction-history',
      },
      {
        id: 'account-security/change-phone-number',
        title: 'Change Your Phone Number',
        permalink: '/helpcenter/docs/account-security/update-details/change-your-phone-number',
      },
      {
        id: 'account-security/password-reset',
        title: 'Reset or Change Your Password',
        permalink: '/helpcenter/docs/account-security/update-details/reset-or-change-your-password',
      },
      {
        id: 'account-security/login-security-history',
        title: 'Manage Login and Security History',
        permalink: '/helpcenter/docs/account-security/verification-and-security/manage-login-and-security-history',
      }
    ]
  };
  
  // Client-side rendering
  useEffect(() => {
    try {
      // Safely get global docs data
      const data = usePluginData('docusaurus-plugin-content-docs') as DocsPluginData;
      
      if (data && data.docs) {
        // If no category provided, try to infer from current path
        const derivedCategory = category || (() => {
          const pathParts = location.pathname.split('/');
          const docsIndex = pathParts.indexOf('docs');
          if (docsIndex >= 0 && docsIndex < pathParts.length - 1) {
            return pathParts[docsIndex + 1];
          }
          return '';
        })();
        
        // Filter documents under the specified directory
        const articleDocs = Object.entries(data.docs)
          .filter(([id]) => id.startsWith(derivedCategory) && !id.endsWith('/index'))
          .map(([_, doc]) => doc)
          .filter(doc => doc.permalink !== location.pathname);
        
        if (articleDocs.length > 0) {
          setRelatedDocs(articleDocs);
          return;
        }
      }
      
      // Fallback to predefined data if dynamic loading fails
      const derivedCategory = category || (() => {
        const pathParts = location.pathname.split('/');
        const docsIndex = pathParts.indexOf('docs');
        if (docsIndex >= 0 && docsIndex < pathParts.length - 1) {
          return pathParts[docsIndex + 1];
        }
        return 'account-security'; // default fallback
      })();
      
      const categoryDocs = fallbackData[derivedCategory] || fallbackData['account-security'];
      const filteredDocs = categoryDocs.filter(doc => doc.permalink !== location.pathname);
      setRelatedDocs(filteredDocs);
      
    } catch (error) {
      console.error('Error in RelatedArticles component:', error);
      
      // Final fallback
      const derivedCategory = category || 'account-security';
      const categoryDocs = fallbackData[derivedCategory] || fallbackData['account-security'];
      const filteredDocs = categoryDocs.filter(doc => doc.permalink !== location.pathname);
      setRelatedDocs(filteredDocs);
    }
  }, [category, location.pathname]);
  
  if (relatedDocs.length === 0) {
    return null;
  }
  
  return (
    <div className="related-articles margin-top--xl">
      <h2>Related Articles</h2>
      <ul className="card-container">
        {relatedDocs.map((article, index) => (
          <li key={index} className="card padding--md margin-bottom--sm">
            <Link to={article.permalink} className="related-article-link">
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 