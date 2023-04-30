import Head from "next/head";
import React from "react";

type SEOProps = { title?: string; desc?: string };

const SEO: React.FC<SEOProps> = ({ title = "SiteXpert", desc = "" }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
