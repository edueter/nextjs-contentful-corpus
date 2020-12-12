// pages/index.js
// import client for contentful
import client from '../lib/contentful-client'

import Section from '../components/sections'
// Import Next.js components
import Head from 'next/head'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import contentfulClient from '../lib/contentful-client'

// Set content for the page
export async function getStaticProps() {
  let data = await client.getEntries({
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
  console.log(pagina)

  const { titulo, slug, secoes } = pagina.fields

  secoes.forEach((secao) => {
    contentfulClient.getEntry(secao.sys.id).then((entry) => console.log(entry))
  })

  return (
    <div>
      <Head>
        <title>{titulo} | Corpus - Fisioterapia & Pilates</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id={slug}>
        
        {secoes.map(secao => {
          const { 
            slug, 
            titulo,
            subtitulo,
            conteudo,
            componentes,
          } = secao.fields


          const { id } = secao.sys
          return (
            <Section 
              key={slug}
              slug={slug} 
              titulo={titulo} 
              subtitulo={subtitulo} 
              conteudo={conteudo} 
              componentes={componentes} 
              id={id}
              />
          )
        })}

      </main>

      <footer >
        (footer)
      </footer>
    </div>
  )
}
