// pages/blog.js
import contentfulClient from "../lib/contentful-client";
import safeJsonStringfy from "safe-json-stringify";

export default function Blog({ posts }) {
  console.log("Conteúdo de posts")
  console.log(posts)
  return (
    <div>Blog</div>
  )
  // return (
  //   <Grid templateColumns={['auto', ,'repeat(auto-fill, minmax(33%, 1fr))']}>
  //     <Box className="destaques">
  //       <Heading>Destaques</Heading>       
  //       <ul>
  //         {posts.filter((post) => post.fields.postDestaque)
  //           .map((post, i) => {
  //             return <li key={i}>{post.fields.titulo}</li>
  //           })}
  //       </ul> 
  //     </Box>
// 
  //     <Box className="que-não-são-destaque">
  //       <Heading>O que não é destaque</Heading>       
  //       <ul>
  //         {posts.filter((post) => !post.fields.postDestaque)
  //           .map((post, i) => {
  //             return <li key={i}>{post.fields.titulo}</li>
  //           })}
  //       </ul> 
  //     </Box>
// 
  //     <Box className="todos-os-posts">
  //       <Heading>Todos</Heading>       
  //       <ul>
  //         {posts.map((post, i) => {
  //           return <li key={i}>{post.fields.titulo}</li>
  //         })}
  //       </ul> 
  //     </Box>
// 
  //   </Grid>
  // )
}

export async function getStaticProps() {
  // This will fetch the whole content for your blog
  const rawData = await contentfulClient.getEntries({
    content_type: 'blogPost',
    order: 'fields.dataHora',
    include: 6
  })
  // This solution was proposed on https://github.com/vercel/next.js/discussions/10992#discussioncomment-103826
  const stringfiedData = safeJsonStringfy(rawData);
  const data = JSON.parse(stringfiedData)
  // Meanwhile this only pulls content marked as Destaque
  //let destaqueData = await contentfulClient.getEntries({
  //  content_type: 'blogPost',
  //  'fields.postDestaque': true,
  //  order: 'fields.dataHora',
  //  include: 6
  //})

  return {
    props: { 
      posts: data.items,
      //destaques: destaqueData.items,
    }
  }
}

export { posts }