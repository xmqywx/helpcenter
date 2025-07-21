import React from 'react';
import Link from '@docusaurus/Link';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

interface DocumentListProps {
  category: string;
}

interface DocInfo {
  id: string;
  href: string;
  label: string;
  customProps?: any;
}

// 辅助函数：生成描述
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
    'spot': 'Learn about spot trading',
    'maintenance': 'Information about platform maintenance',
    'regulatory': 'Important regulatory and compliance updates',
    'features': 'Latest features and improvements',
    'sorting': 'Testing document sorting functionality'
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

// 递归提取指定类别下的所有文档
function extractDocsFromCategory(items: PropSidebarItem[], targetCategory: string): DocInfo[] {
  const docs: DocInfo[] = [];
  
  function traverse(items: PropSidebarItem[], currentPath: string[] = []) {
    for (const item of items) {
      if (item.type === 'category') {
        const newPath = [...currentPath, item.label];
        const categoryPath = newPath.join('/').toLowerCase().replace(/\s+/g, '-');
        
        // 检查是否是目标类别
        if (categoryPath === targetCategory || currentPath.length === 0) {
          // 如果是目标类别，收集其中的文档
          if (categoryPath === targetCategory) {
            for (const subItem of item.items) {
              if ((subItem.type === 'link' && subItem.docId) || subItem.type === 'link') {
                docs.push({
                  id: subItem.docId || subItem.href,
                  href: subItem.href,
                  label: subItem.label,
                  customProps: subItem.customProps
                });
              }
            }
          } else {
            // 继续遍历子类别
            traverse(item.items, newPath);
          }
        }
      }
    }
  }
  
  traverse(items);
  return docs;
}

export default function DocumentList({ category }: DocumentListProps): React.ReactNode {
  const sidebar = useDocsSidebar();
  
  if (!sidebar) {
    return <div>No sidebar data available.</div>;
  }
  
  // 从 sidebar 中提取指定类别的文档
  // 注意：category 参数可能包含多级路径，如 "account-security/create-coinbyte-account"
  const categoryDocs = extractDocsFromCategory(sidebar.items, category);
  
  if (categoryDocs.length === 0) {
    // 如果没有找到，尝试在所有文档中查找匹配的
    const allDocs: DocInfo[] = [];
    
    function extractAllDocs(items: PropSidebarItem[]) {
      for (const item of items) {
        if (item.type === 'link' && item.docId) {
          if (item.docId.startsWith(category + '/')) {
            allDocs.push({
              id: item.docId,
              href: item.href,
              label: item.label,
              customProps: item.customProps
            });
          }
        } else if (item.type === 'category') {
          extractAllDocs(item.items);
        }
      }
    }
    
    extractAllDocs(sidebar.items);
    
    // 过滤掉 index 文档
    const filteredDocs = allDocs.filter(doc => !doc.id.endsWith('/index'));
    
    if (filteredDocs.length === 0) {
      return <div className="margin-bottom--lg">No documents found in this category.</div>;
    }
    
    return (
      <div className="row category-list">
        {filteredDocs.map((doc) => {
          const description = doc.customProps?.description || generateDescription(doc.id);
          
          return (
            <div className="col col--4 margin-bottom--lg" key={doc.id}>
              <div className="card">
                <div className="card__body">
                  <h3>{doc.label}</h3>
                  <p>{description}</p>
                </div>
                <div className="card__footer">
                  <Link 
                    className="button button--primary button--block" 
                    to={doc.href}
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
  }
  
  return (
    <div className="row category-list">
      {categoryDocs.map((doc) => {
        const description = doc.customProps?.description || generateDescription(doc.id);
        
        return (
          <div className="col col--4 margin-bottom--lg" key={doc.id}>
            <div className="card">
              <div className="card__body">
                <h3>{doc.label}</h3>
                <p>{description}</p>
              </div>
              <div className="card__footer">
                <Link 
                  className="button button--primary button--block" 
                  to={doc.href}
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
}