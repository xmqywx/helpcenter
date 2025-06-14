import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';

interface DocumentListProps {
  category: string;
}

type DocItem = any;

// 辅助函数：将文件名转换为可读标题
function formatTitle(filename: string): string {
  return filename
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\bKyc\b/g, 'KYC')
    .replace(/\bApi\b/g, 'API')
    .replace(/\bSms\b/g, 'SMS')
    .replace(/\bAud\b/g, 'AUD')
    .replace(/\bNzd\b/g, 'NZD')
    .replace(/\bApp\b/g, 'App')
    .replace(/\bOsko\b/g, 'Osko')
    .replace(/\bPayid\b/g, 'PayID')
    .replace(/\bPoli\b/g, 'POLi');
}

// 辅助函数：根据文档ID生成描述
function generateDescription(docId: string): string {
  const filename = docId.split('/').pop() || '';
  
  // 基于文件名的描述映射
  const descriptionPatterns: Record<string, string> = {
    'download': 'Learn how to download or update the CoinByte app',
    'register': 'Learn how to register and set up your CoinByte account',
    'password': 'Learn about password requirements and management',
    'corporate': 'Learn how to set up a corporate account for business use',
    'two-factor': 'Learn how to set up and use two-factor authentication',
    'kyc': 'Learn how to complete KYC verification',
    'verify': 'Learn how to verify your account information',
    'change': 'Learn how to change or update your account settings',
    'manage': 'Learn how to manage your account settings and history',
    'risk': 'Learn about risk management and fraud prevention',
    'reset': 'Learn how to reset or change your account credentials',
    'email': 'Troubleshoot email-related issues',
    'sms': 'Troubleshoot SMS-related issues',
    'deposit': 'Learn how to deposit funds or crypto',
    'withdraw': 'Learn how to withdraw funds or crypto',
    'trading': 'Learn about trading features and options',
    'instant': 'Learn about instant buy and sell features',
    'limit': 'Learn about limit orders',
    'market': 'Learn about market orders',
    'spot': 'Learn about spot trading'
  };
  
  // 查找匹配的关键词
  for (const [keyword, description] of Object.entries(descriptionPatterns)) {
    if (filename.toLowerCase().includes(keyword)) {
      return description + '.';
    }
  }
  
  // 默认描述
  return 'Learn more about this topic.';
}

export default function DocumentList({ category }: DocumentListProps): React.ReactNode {
  const [error, setError] = useState<string | null>(null);
  
  try {
    // 使用 Docusaurus v3 中的 useAllDocsData 钩子
    const allDocsData = useAllDocsData() as any;

    if (!allDocsData) {
      console.warn('No docs data available');
      return <div>No document data available.</div>;
    }
    
    // 获取默认的文档数据
    const docsData = allDocsData.default;
    
    if (!docsData || !docsData.versions || !docsData.versions[0] || !docsData.versions[0].docs) {
      console.warn('Invalid docs data structure');
      return <div>Unable to find documents data.</div>;
    }
    
    const docs = docsData.versions[0].docs as Record<string, DocItem>;
    
    // 过滤出指定目录下的文档，排除index.md
    const filteredDocs = Object.values(docs).filter(doc => 
      doc.id.startsWith(category + '/') && !doc.id.endsWith('/index')
    ).sort((a, b) => {
      // 尝试按照sidebar_position排序，如果它存在于metadata或frontMatter中
      const posA = a.metadata?.sidebar_position ?? a.frontMatter?.sidebar_position ?? a.sidebar_position ?? 999;
      const posB = b.metadata?.sidebar_position ?? b.frontMatter?.sidebar_position ?? b.sidebar_position ?? 999;
      return posA - posB;
    });
    
    if (filteredDocs.length === 0) {
      return <div className="margin-bottom--lg">No documents found in this category.</div>;
    }
    
    return (
      <div className="row category-list">
        {filteredDocs.map((doc) => {
          // 从文档ID中提取文件名并格式化为标题
          const filename = doc.id.split('/').pop() || '';
          const title = formatTitle(filename);
          const description = generateDescription(doc.id);
          const path = doc.path || doc.permalink || `#${doc.id}`;
          
          return (
            <div className="col col--4 margin-bottom--lg" key={doc.id}>
              <div className="card">
                <div className="card__body">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <div className="card__footer">
                  <Link 
                    className="button button--primary button--block" 
                    to={path}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    console.error("Error in DocumentList component:", error);
    // 将错误信息更新到状态
    useEffect(() => {
      setError(error instanceof Error ? error.message : String(error));
    }, [error]);
    
    return (
      <div className="alert alert--danger margin-bottom--lg">
        <p>Failed to load documents. Please try again later.</p>
        {error && <details><summary>Error details</summary><pre>{error}</pre></details>}
      </div>
    );
  }
} 