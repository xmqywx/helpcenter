/**
 * 独立的相关文章组件，可以更灵活地在不同位置使用
 */

import React from 'react';
import clsx from 'clsx';
import {useDoc} from '@docusaurus/theme-common/internal';
import {useDocsSidebar} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

/**
 * 获取相关文档
 * 这个函数可以根据业务逻辑定制，这里只是简单地根据当前文档所在的类别获取
 */
function getRelatedDocs(currentDocId, sidebarItems) {
  const category = currentDocId.split('/')[0];
  const relatedDocs = [];
  
  // 找出与当前文档相同类别的其他文档
  function findDocsByCategoryRecursive(items, category, currentDocId) {
    for (const item of items) {
      if (item.type === 'category' && item.items) {
        findDocsByCategoryRecursive(item.items, category, currentDocId);
      } else if (item.type === 'doc' && item.id !== currentDocId) {
        const docCategory = item.id.split('/')[0];
        if (docCategory === category) {
          relatedDocs.push({
            id: item.id,
            title: item.label,
            permalink: item.href,
          });
        }
      }
    }
  }

  if (sidebarItems) {
    findDocsByCategoryRecursive(sidebarItems, category, currentDocId);
  }

  // 只返回最多3篇相关文档
  return relatedDocs.slice(0, 3);
}

export default function DocRelatedContent() {
  const {metadata} = useDoc();
  const sidebar = useDocsSidebar();
  
  // 获取相关文档列表
  const relatedDocs = getRelatedDocs(
    metadata.id,
    sidebar?.items || []
  );

  if (relatedDocs.length === 0) {
    return null;
  }

  return (
    <div className={styles.relatedContent}>
      <h2 className={styles.relatedContentTitle}>相关文章</h2>
      <div className={styles.relatedContentGrid}>
        {relatedDocs.map((doc) => (
          <div key={doc.id} className={styles.relatedContentItem}>
            <h3 className={styles.relatedContentItemTitle}>
              <Link to={doc.permalink}>{doc.title}</Link>
            </h3>
            <Link to={doc.permalink} className={styles.relatedContentItemLink}>
              阅读更多 →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 