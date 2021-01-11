//* Chakra-ui
import { AspectRatio, Box, Grid } from "@chakra-ui/react"

//* NextJS
import Image from "next/image"

//* Contentful & Rich Text tools
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

//* Components
import { Container, Display } from "../layout"
import { PostDestaque } from "./blog/PostDestaque"


const HomeBlog = ({ secao, posts }) => {

  const { slug, subtitulo, conteudo } = secao.fields

  return (
    <Box
      id={slug}
      pos="relative"
      as="section"
      pb={16}
      bgColor="corpus-baby-blue.400">
      <Box bgColor="corpus-baby-blue.400"
        className="section--divider pilates"
        pos="absolute"
        top={['-4rem', '-10rem']}
        left="0"
        right="0"
        zIndex="0"
        width="100%"
        height={['4rem', "10rem"]}
        transform="rotateY(180deg)"
        style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }}
      ></Box>
      <Container>
        <Grid
          templateColumns={[, , , 'auto .4fr']}
          templateRows={[, , , '.1fr .6fr']}
          templateAreas={[, , , '"ilustra titulo" "ilustra intro"']}>
          <AspectRatio gridArea="ilustra" ratio={1} mt={-64} ml={-10}>
            <Image src="/images/index/home-blog-bkg.png" layout="fill" objectFit="contain" quality="100" />
          </AspectRatio>
          <Box gridArea="titulo">
            <Display>{subtitulo}</Display>
          </Box>
          <Box gridArea="intro">
            {documentToReactComponents(conteudo)}
          </Box>
        </Grid>
        <Grid
          templateColumns={[, , , '.6fr auto']}
          templateRows={[, , , '.repeat(2, .5fr)']}
          templateAreas={['"ilustra titulo" "ilustra intro" "principal menor" "principal menor"']}
          gap={8}>


          {posts.filter((post) => (post.fields.postDestaque)).slice(0, 1).map((post, i) => {
            return <PostDestaque key={i} post={post} />
          })
          }

        </Grid>
      </Container>
    </Box>
  )
}

export default HomeBlog


