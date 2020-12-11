// pages/table-of-contents.js
// import client for contentful
import client from '../lib/contentful-client'

// Import Next.js components
import Head from 'next/head'
import Link from 'next/link'

// Set content for the page

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: "paginas"
  })
  return {
    props: {
      paginas: data.items
    },
  }
}

export default function Home({ paginas }) {
  console.log('paginas')
  return (
    <div>
      <Head>
        <title>Corpus - Fisioterapia & Pilates</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        (main page)
        <ul>
          {paginas.map(pagina => (
            <li key={pagina.sys.id}>
              <Link href={pagina.fields.slug}>
                <a>
                  {pagina.fields.titulo}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer >
        (footer)
      </footer>
    </div>
  )
}
