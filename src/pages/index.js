import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: '框架式开发',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Graia Framework 在 Graia Project 中作为基础设施的一部分, 借鉴了多种机器人开发框架的设计, 并创造出了多种独有设计, 从而使开发者能更好的表现逻辑思维.
      </>
    ),
  },
  {
    title: '简洁而强大',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        化繁为简，通过将复杂的底层简单化，只需一行代码，便可创造一切可能
      </>
    ),
  },
  {
    title: '富有表现性',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        通过使用 <code>Dispatcher</code>, <code>Decorator</code>, <code>Interrupt</code> 等特性, 你大可不必将精力放在处理繁琐的网络通信上，只需要你有无限的想法
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Graiax Document${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
