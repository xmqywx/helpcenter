import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CoinByte Support Center',
  tagline: 'Customer service and helpdesk',
  favicon: 'img/favicon.png',

  // S3 deployment configuration
  url: 'http://helpcentergithub.s3-website.ap-east-1.amazonaws.com',
  baseUrl: '/',
  
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // App-mode: 仅当页面带 ?app=1（从 CoinByte App 的 webview 打开）时，给 <html>
  // 加 `app-mode` class + `data-app-theme="<dark|light|classic>"`（来自 ?theme=），
  // 使 app-mode.css 按 app 当前主题应用对应调色板。
  //
  // 关键：只认【当前 URL 的 ?app=1】，不做任何 sessionStorage 持久化 => 普通 web
  // 访问（不带参数）永远是原站样式，公开站点零影响。
  //
  // Docusaurus 在 hydration 时会用它自己的串覆盖 <html> className，把我们加的 class
  // 抹掉；故用 MutationObserver 盯住 class，一旦 app-mode 被移除就立刻补回（早注入=
  // 无闪烁，被覆盖=瞬时补回，有 contains 守卫不会死循环）。data-app-theme 是自定义
  // 属性，Docusaurus 不管理，设一次即可。
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML:
        "(function(){try{var p=new URLSearchParams(window.location.search);if(p.get('app')!=='1'){return;}var el=document.documentElement;el.setAttribute('data-app-theme',p.get('theme')||'dark');var add=function(){if(el.classList&&!el.classList.contains('app-mode')){el.classList.add('app-mode');}};add();try{var mo=new MutationObserver(add);mo.observe(el,{attributes:true,attributeFilter:['class']});}catch(e){}}catch(e){}})();",
    },
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
        direction: 'ltr',
      },
      zh: {
        label: '中文',
        htmlLang: 'zh-CN',
        direction: 'ltr',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
          breadcrumbs: true,
          routeBasePath: 'docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: ['./src/css/custom.css', './src/css/app-mode.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Help Center',
      logo: {
        alt: 'CoinByte Logo',
        src: 'img/coinbyte_support1.svg',
      },
      items: [
        // 已隐藏导航元素
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Docs',
        // },
        // {to: '/blog', label: 'Blog', position: 'left'},
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
        // {
        //   href: 'https://github.com/CatherineXiaoXiao/helpcenter',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} CoinByte Help Center. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
