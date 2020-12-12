// pages/index.js
// import client for contentful
import client from '../lib/contentful-client'

import RenderSection from '../components/sections'
// Import Next.js components
import Head from 'next/head'
import contentfulClient from '../lib/contentful-client'

// Set content for the page
export async function getStaticProps() {
  let data = await contentfulClient.getEntries({
    content_type: 'paginas',
    'fields.slug': 'inicio'
  })
  return {
    props: {
      pagina: data.items[0]
    }
  }
}

export default function Home({ pagina }) {
  
  const { titulo, slug, secoes } = pagina.fields 
  console.log("Seções ____________________")
  console.log(secoes)

  return (
    <div>
      <Head>
        <title>{titulo} | Corpus - Fisioterapia & Pilates</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id={slug}>
        {secoes.map((secao) => {
          contentfulClient.getEntry(secao.sys.id).then((entry) => {
            console.log(`>>   Seção ${entry.fields.slug}`)
            console.log(entry);            
          });
        })}
      </main>
    <footer >
        (footer)
    </footer>
    </div>
  )
}
