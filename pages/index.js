// pages/index.js
// import client for contentful
import client, { parseEntries } from '../lib/contentful-client'

import SectionRenderer from '../components/sections'
// Import Next.js components
import Head from 'next/head'
import contentfulClient from '../lib/contentful-client'
import Layout from '../components/layout'
import Whatsapp from '../components/modais/whatsapp'

// Set content for the page
export async function getStaticProps() {
  let data = await contentfulClient.getEntries({
    content_type: 'paginas',
    'fields.slug': 'inicio',
    include: 6
  })
  return {
    props: {
      pagina: data.items[0]
    }
  }
}

export default function Home({ pagina }) {
  
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
          console.log(">> Seção " + secao.fields.slug)
          console.log(secao)
          return <SectionRenderer key={secao.fields.slug} secao={secao} />
        })}
      </Layout>
    </div>
  )
}
