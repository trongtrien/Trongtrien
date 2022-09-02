import React from 'react';
import Head from 'next/head'
import { baseUrl } from '../utils/baseUrl';

export default function SEO({
  description,
  author = 'trongtrien',
  meta,
  title,
  imgUrl
}) {
  const metaData = [
    {
      name: `description`,
      content: description,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:creator`,
      content: author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
  ].concat(meta);
  
  return (<>
    <Head>
      <title>{title}</title>
      <meta name="twitter:image:src" content={`${baseUrl}/media/img/${imgUrl}`} />
      <meta property="og:image" content={`${baseUrl}/media/img/${imgUrl}`} />
      {metaData.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
    </Head>
</>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
};
