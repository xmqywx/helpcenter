/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import {DocBreadcrumbsContext, useSidebarBreadcrumbs} from '@docusaurus/theme-common/internal';
import {useRouteMatch} from '@docusaurus/router';
import styles from '../../styles.module.css';
import DocBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Item';

function Separator(): JSX.Element {
  return <li className={styles.breadcrumbSeparator}>/</li>;
}

export default function DocBreadcrumbsPath(): JSX.Element | null {
  const breadcrumbs = useSidebarBreadcrumbs();
  const {breadcrumbsHomeItem, activeBreadcrumb} = React.useContext(
    DocBreadcrumbsContext,
  );

  if (!breadcrumbs?.length) {
    return null;
  }

  return (
    <>
      {breadcrumbsHomeItem && <Separator />}
      {breadcrumbs.map((item, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        const childNode = isLast ? activeBreadcrumb : item.label;
        return (
          <React.Fragment key={idx}>
            <DocBreadcrumbItem
              index={idx}
              breadcrumbsHomeItem={breadcrumbsHomeItem}
              activeBreadcrumb={activeBreadcrumb}>
              {childNode}
            </DocBreadcrumbItem>
            {!isLast && <Separator />}
          </React.Fragment>
        );
      })}
    </>
  );
} 