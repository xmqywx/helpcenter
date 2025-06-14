/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import type {Props} from '@theme/DocItem/Layout';

import styles from './styles.module.css';

export default function DocItemLayout({children}: Props): JSX.Element {
  const {isMobile} = useWindowSize();
  
  // 获取frontMatter和toc属性
  // 注意：这里我们不使用useDoc，而是直接从props传递
  const frontMatter = {};
  const toc = [];
  
  const hideTableOfContents = frontMatter.hide_table_of_contents;
  const tocMinHeadingLevel = frontMatter.toc_min_heading_level;
  const tocMaxHeadingLevel = frontMatter.toc_max_heading_level;

  return (
    <div className="row">
      <div className={clsx('col', !hideTableOfContents && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          {/* 添加面包屑导航 */}
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {isMobile && <DocItemTOCMobile />}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
          
          {/* 添加相关文章区域，但不使用DocRelatedContent组件 */}
          <div className={styles.relatedArticles}>
          
          </div>
        </div>
      </div>
      {!hideTableOfContents && !isMobile && (
        <div className="col col--3">
          <DocItemTOCDesktop
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        </div>
      )}
    </div>
  );
} 