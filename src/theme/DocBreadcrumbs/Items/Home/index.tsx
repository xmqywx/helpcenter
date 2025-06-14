/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import {useHomePageRoute} from '@docusaurus/theme-common/internal';
import {Home} from 'lucide-react';
import {translate} from '@docusaurus/Translate';

export default function HomeBreadcrumbItem(): JSX.Element {
  const homePageRoute = useHomePageRoute();

  if (!homePageRoute) {
    return null;
  }

  return (
    <>
      <li
        className="breadcrumbs__item"
        itemScope
        itemProp="itemListElement"
        itemType="https://schema.org/ListItem">
        <Link
          className="breadcrumbs__link"
          href={homePageRoute.path}
          itemProp="item">
          <Home className="breadcrumbs__icon" />
          <span itemProp="name">
            {translate({
              id: 'theme.docs.breadcrumbs.home',
              message: 'Home',
              description: 'The ARIA label for the home page in the breadcrumbs',
            })}
          </span>
        </Link>
        <meta itemProp="position" content="1" />
      </li>
      <li className="breadcrumbs__separator">/</li>
    </>
  );
} 