/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {
  useSidebarBreadcrumbs,
  useHomePageRoute,
} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import {useBaseUrl} from '@docusaurus/useBaseUrl';
import {File, Folder} from 'lucide-react';

import type {Props} from '@theme/DocBreadcrumbs/Items/Item';

function BreadcrumbsItemIcon({ type }: { type: 'category' | 'link' | 'doc' }): JSX.Element {
  if (type === 'category') {
    return <Folder className="breadcrumbsIcon" />;
  }
  return <File className="breadcrumbsIcon" />;
}

export default function DocBreadcrumbItem({
  children,
  active,
  index,
  addMicrodata,
  breadcrumbsHomeItem,
}: Props): JSX.Element {
  const icon = breadcrumbsHomeItem ? null : (
    <BreadcrumbsItemIcon 
      type={breadcrumbsHomeItem?.type ?? 'link'} 
    />
  );

  if (active) {
    return (
      <li
        className={clsx('breadcrumbsItem', 'breadcrumbsItemActive')}
        {...(addMicrodata && {
          itemScope: true,
          itemProp: 'itemListElement',
          itemType: 'https://schema.org/ListItem',
        })}>
        <span className="breadcrumbsItemLink" itemProp="name">
          {icon}
          {children}
        </span>
        {addMicrodata && <meta itemProp="position" content={String(index + 1)} />}
      </li>
    );
  }

  return (
    <>
      <li
        className="breadcrumbsItem"
        {...(addMicrodata && {
          itemScope: true,
          itemProp: 'itemListElement',
          itemType: 'https://schema.org/ListItem',
        })}>
        <Link
          className={clsx('breadcrumbsItemLink')}
          {...(breadcrumbsHomeItem
            ? {
                href: useBaseUrl(breadcrumbsHomeItem.href),
                itemProp: 'item',
              }
            : {
                autoAddBaseUrl: true,
                href: children as string,
                itemProp: 'item',
              })}>
          {icon}
          <span itemProp="name">{children}</span>
        </Link>
        {addMicrodata && <meta itemProp="position" content={String(index + 1)} />}
      </li>
      <li className="breadcrumbsSeparator">/</li>
    </>
  );
} 