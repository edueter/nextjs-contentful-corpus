// pages/[slug].js
// Contentful client
import contentfulClient from '../lib/contentful-client'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Image from 'next/image'

// Função que gera contexto para criar paginas durante o build
export async function getStaticPaths() {
  let data = await contentfulClient.getEntries({
    content_type: "paginas",
  });

  return {
    paths: data.items.map((item) => ({
      params: { slug: item.fields.slug },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  let data = await contentfulClient.getEntries({
    content_type: "paginas",
    'fields.slug': params.slug,
  })

  return {
    props: {
      pagina: data.items[0],
    },
  };
}

export default function Pagina({ pagina }) {
  if (!pagina) return <div>404</div>
  return (
    <div>
      <h1>{pagina.fields.titulo}</h1>
      <div>{documentToReactComponents(pagina.fields.conteudo, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => (
            <div>
              <Image 
                src={'https:' + node.data.target.fields.file.url} 
                width={node.data.target.fields.file.details.image.width} 
                height={node.data.target.fields.file.details.image.height} />
                <span>{node.data.target.fields.title}</span>
            </div>
          )
        }
      })}</div>
    </div>
  )
}