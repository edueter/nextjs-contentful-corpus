// pages/index.js
// import client for contentful
import contentfulClient from '../lib/contentful-client'
import safeJsonStringfy from 'safe-json-stringify'

// Import Next.js components
import Head from 'next/head'
import Layout from '../components/layout'

import SectionRenderer from '../components/sections'
import Whatsapp from '../components/modais/whatsapp'

// Set content for the page
export async function getStaticProps() {
  let pageData = await contentfulClient.getEntries({
    content_type: 'paginas',
    'fields.slug': 'inicio',
    include: 6
  })
  // This will fetch the whole content for your blog
  const rawBlogData = await contentfulClient.getEntries({
    content_type: 'blogPost',
    order: 'fields.dataHora',
    include: 6
  })
  // This solution was proposed on https://github.com/vercel/next.js/discussions/10992#discussioncomment-103826
  const stringfiedData = safeJsonStringfy(rawBlogData);
  const blogData = JSON.parse(stringfiedData)

  return {
    props: {
      pagina: pageData.items[0],
      posts: blogData.items,
    }
  }
}


export default function Home({ pagina, posts }) {
  
  const { titulo, slug, secoes } = pagina.fields 

  return (
    <div>
      <Head>
        <title>{titulo} | Corpus - Fisioterapia & Pilates</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout id={slug}>
        <Whatsapp />
        {secoes.map((secao) => {
          // console.log(">> Seção " + secao.fields.slug)
          // console.log(secao)
          return <SectionRenderer key={secao.fields.slug} secao={secao} posts={posts} />
        })}
      </Layout>
    </div>
  )
}
