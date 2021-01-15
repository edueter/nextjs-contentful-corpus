// pages/blog.js
import contentfulClient from "../lib/contentful-client";
import safeJsonStringfy from "safe-json-stringify";
import { Grid, Heading, SimpleGrid, Flex, GridItem, Stack, Skeleton, SkeletonText, AspectRatio, Img, SkeletonCircle, Spacer, HStack } from "@chakra-ui/react";
import { Container } from "../components/layout"

export default function Blog({ posts }) {
  console.log("Conteúdo de posts")
  console.log(posts)

  const stdGap = 4

  const grids = {
    parent: ['auto', , 'repeat(8, auto)', 'repeat(12, auto)'],
    childs: {
      '4': ['auto', , 3, 4],
      '6': ['auto', , 4, 6],
      '8': ['auto', , 6, 8],
      '10': ['auto', , 6, 10],
      '12': ['auto', , 8, 12],
    }
  }

  const Grid12 = ({ children }) => {
    return (
      <Grid
        templateColumns={grids.parent}
        templateRows="auto"
        gap={stdGap}>{children}</Grid>
    )
  }

  const StdHeading = ({ as, fontSize, fontWeight, children, mb }) => {
    const textDecorationColor = "#E59D23"
    return (
      <Heading
        as={as || 'h2'}
        fontFamily="display"
        fontWeight={fontWeight || "400"}
        color="primary.600"
        fontSize={fontSize || '3xl'}
        mb={mb || 4}
        style={{
          textDecoration: as === 'h1' ? 'none' : 'underline',
          textDecorationColor: textDecorationColor,
          textDecorationThickness: ".1275rem"
        }}
        letterSpacing="tight">{children}</Heading>
    )
  }

  const SkeletonPost = ({ type }) => {
    switch (type) {
      case 'destaque':
        return (
          <Stack bgColor="primary.100" p={4} >
            <Skeleton>
              <AspectRatio ratio={19 / 10}>
                <div />
              </AspectRatio>
            </Skeleton>
            <Skeleton>
              <h3>Título do post</h3>
            </Skeleton>
            <HStack spacing={2}>
              <SkeletonCircle size="6" />
              <Skeleton><h4>Nome do Autor</h4></Skeleton>
              <Spacer />
              <Skeleton><span>Data do post</span></Skeleton>
            </HStack>
            <Spacer />
            <SkeletonText noOfLines={5} spacing={3} />
          </Stack>
        );
      case 'destaqueMenor':
        return (
          <Stack bgColor="primary.100" p={4} >
            <Skeleton>
              <AspectRatio ratio={23 / 9}>
                <Img />
              </AspectRatio>
            </Skeleton>
            <Skeleton>
              <h3>Título do post</h3>
            </Skeleton>
            <HStack spacing={2}>
              <SkeletonCircle size="6" />
              <Skeleton><h4>Nome do Autor</h4></Skeleton>
              <Spacer />
              <Skeleton><span>Data do post</span></Skeleton>
            </HStack>
          </Stack>
        );
      case 'autor':
        return (
          <Flex flexWrap="wrap" justifyContent="space-between" bgColor="primary.100" p={4} >
              <Skeleton flexBasis="22.5%" h="100%" />
              <Stack flexBasis="72.5%">
                <Skeleton><h4>Nome do Autor</h4></Skeleton>
                <SkeletonText noOfLines={3} spacing={3} />
              </Stack>
          </Flex>
        );
      default:
        return (
          <Stack bgColor="primary.100" p={4} >
            <Skeleton>
              <AspectRatio ratio={23 / 9}>
                <Img />
              </AspectRatio>
            </Skeleton>
            <Skeleton>
              <h3>Título do post</h3>
            </Skeleton>
            <HStack spacing={2}>
              <SkeletonCircle size="6" />
              <Skeleton><h4>Nome do Autor</h4></Skeleton>
              <Spacer />
              <Skeleton><span>Data do post</span></Skeleton>
            </HStack>
          </Stack>
        );
    }

  }


  return (
    <Container>
      <Grid12>
        <GridItem
          rowSpan={1}
          colSpan={grids.childs[12]}
          className="titulo">
          <StdHeading as="h1" fontWeight="600" fontSize="5xl" mb="0">Blog da Corpus</StdHeading>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={grids.childs[12]}
          className="titulo--destaques">
          <StdHeading>Posts em Destaque</StdHeading>
        </GridItem>
        <GridItem
          rowSpan={3}
          colSpan={grids.childs[8]}
          className="post--destaque">
          <SkeletonPost type="destaque" />
        </GridItem>
        <GridItem
          rowSpan={3}
          colSpan={grids.childs[4]}
          className="post--destaque--menor">
            <Stack spacing={4}>
              <SkeletonPost type="destaqueMenor" />
              <SkeletonPost type="destaqueMenor" />
            </Stack>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={grids.childs[8]}
          className="titulo--normais">
          <StdHeading>Outros posts</StdHeading>
          <SimpleGrid columns={[1, , 2 ]} spacing={4}>
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </SimpleGrid>
        </GridItem>
        <GridItem
          colSpan={grids.childs[4]}
          className="autores">
          <StdHeading>Posts por autor</StdHeading>
          <SimpleGrid columns={1} spacing={4}>
          <SkeletonPost type="autor" />
          <SkeletonPost type="autor" />
          <SkeletonPost type="autor" />
          <SkeletonPost type="autor" />

          </SimpleGrid>
        </GridItem>
      </Grid12>
      

    </Container>
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