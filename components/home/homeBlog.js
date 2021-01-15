//* Chakra-ui
import { AspectRatio, Box, chakra, Grid, Heading, UnorderedList, Text, Flex, Spacer, Button, Tooltip } from "@chakra-ui/react"

//* NextJS
import Image from "next/image"
import Link from "next/link"

//* Contentful & Rich Text tools
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { MARKS, BLOCKS } from '@contentful/rich-text-types'

//* Components
import { Container, Display } from "../layout"
import { PostDestaque } from "./blog/PostDestaque"


const PostsSecundarios = ({ transitions, post }) => {
  const { titulo, slug, autor, categorias, artigo, imagemDestaque } = post.fields
  const { url, details } = imagemDestaque.fields.arquivo.fields.file
  return (
    <Flex
      flexWrap="nowrap"
      flexDir="column"
      role="group"
      transition={transitions.principal}
      boxShadow="lg"
      bgColor="grayBlue.100"
      _hover={{
        bgColor: 'white',
        boxShadow: 'xl'
      }}>
      <AspectRatio
        ratio={16 / 9}
        borderBottomColor="secondary.300"
        borderBottomStyle="solid"
        borderBottomWidth={2} >
        <Image
          src={'https:' + url}
          alt={details}
          layout="fill"
          objectFit="cover"
        />
      </AspectRatio>
      <UnorderedList
        w="fit-content"
        maxW={["80%", , ,"100%"]}
        h={6}
        pos="relative"
        mt={-3}
        ml={-1}
        pl={5}
        pr={2}
        pt=""
        bgColor="secondary.300"
        _before={{
          content: '""',
          pos: 'absolute',
          top: 0,
          bottom: 0,
          left: -3,
          h: 0,
          w: 0,
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderTopWidth: 14,
          borderBottomWidth: 13,
          borderStyle: "solid",
          borderLeftColor: 'transparent',
          borderRightColor: 'secondary.300',
          borderTopColor: 'secondary.300',
          borderBottomColor: 'secondary.300',
        }}
        _after={{
          content: '""',
          pos: 'absolute',
          top: 0,
          bottom: 0,
          right: "-20px",
          h: 0,
          w: 0,
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderTopWidth: 14,
          borderBottomWidth: 13,
          borderStyle: "solid",
          borderLeftColor: 'secondary.300',
          borderRightColor: 'transparent',
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
        }}>
        {categorias.slice(0, 2).map((categoria, i) => {
          const { nome, slug } = categoria.fields
          return (
            <Link href={`/blog/categoria/${slug}`} key={i}>
              <chakra.a
                _notFirst={{
                  display: [ 
                    "none", , , "inline"
                  ],

                }}
                wordBreak="keep-all"
                color="primary.600"
                fontFamily="display"
                fontSize={["sm"]}
                fontWeight="300"
                cursor="pointer"
                borderBottomWidth={2}
                borderBottomStyle="solid"
                borderBottomColor="transparent"
                transition={transitions.links}
                _hover={{
                  color: 'secondary.600',
                  borderBottomColor: 'secondary.400'

                }}
                _notLast={{
                  _after: {
                    content: '", "',
                    h: '100%',
                    display: [ "none", , ,"inline"]
                  },
                  mr: 1
                }}
              >
                {nome}
              </chakra.a>
            </Link>
          )
        })}
      </UnorderedList>
      <Spacer />

      <Link href={`/blog/${slug}`} alt="ler este post">
        <Heading as="h3"
          fontSize="lg"
          fontFamily="display"
          fontWeight="600"
          letterSpacing="tight"
          cursor="pointer"
          mt={2}
          mx={4}
          color="primary.600"
          _groupHover={{
          color: 'primary.500'
          }}>
          {titulo}
        </Heading>
      </Link>
      <Link href={`/blog/autor/${autor.fields.slug}`} alt="ver mais posts deste autor" >
        <Text
          as="span"
          cursor="pointer"
          mx={4}
          fontSize="sm"
          color="grayBlue.700">
            por: {autor.fields.nome}
          </Text>
      </Link>
      <Box mt={3} mb={1} mx={4} isTruncated noOfLines="5">
        {documentToReactComponents(artigo, {
          renderMark: {
            [MARKS.BOLD]: text => <Text as="b">{text}</Text>,
            [MARKS.ITALIC]: text => <Text as="i">{text}</Text>,
            [MARKS.UNDERLINE]: text => <Text as="u">{text}</Text>
          },
          renderNode: {
            [BLOCKS.PARAGRAPH]: (_node, children) => (
              <Text
                fontSize="md"
                lineHeight="1.3444em"
                fontFamily="body"
                color="grayBlue.700"
                fontWeight="300"
              >{children}</Text>
            )
          }
        })}
      </Box>
      <Spacer />
      <Link href={slug}>
        <chakra.a
          fontFamily="display"
          fontWeight="400"
          color="primary.400"
          cursor="pointer"
          fontSize="sm"
          h="fit-content"
          pos="relative"
          ml="auto"
          mr={4}
          mb={3}

          _after={{
            transition: transitions.links,
            content: '"»"',
            pos: "absolute",
            color: 'primary.400',
            right: 4,
            fontSize: 'sm',
            lineHeight: '1.6em',
            opacity: 0
          }}
          alignSelf="flex-end"
          transition={transitions.links}
          _groupHover={{
            pr: '4',
            _after: {
              right: 1,
              opacity: 1

            },
            _hover: {
              color: 'secondary.500',
              pr: 5,
              _after: {
                right: 0,
                color: 'primary.500'
              }
            },
            color: 'secondary.500'
          }}
        >Ler Mais</chakra.a>
      </Link>
    </Flex>
  )
}

const HomeBlog = ({ secao, posts }) => {

  const { slug, subtitulo, conteudo } = secao.fields

  const transitions = {
    principal: "all .25s .05s ease-in-out",
    links: "all .25s .15s ease-in-out"
  }

  console.log("Filtragem----------")
  console.log(posts.filter((post) => (!post.fields.postDestaque)).slice(0, 3).map((post) => (post.fields)))

  return (
    <Box
      id={slug}
      pos="relative"
      as="section"
      pt={5}
      pb={16}

      bgGradient="linear(to-t, babyBlue.600 0%, babyBlue.400 80%)">
      <Box bgColor="babyBlue.400"
        className="section--divider pilates"
        pos="absolute"
        top={['-4rem', , , '-10rem']}
        left="0"
        right="0"
        zIndex="0"
        width="100%"
        height={['4rem', , , "10rem"]}
        transform="rotateY(180deg)"
        style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }}
      ></Box>
      <Container>
        <Grid
          templateColumns={['1fr', , , '.5fr .4fr']}

          templateRows={[, '.5fr .2fr .3fr', , '.1fr .6fr']}
          templateAreas={[, '"ilustra" "titulo" "intro"', , '"ilustra titulo" "ilustra intro"']}>
          <AspectRatio
            gridArea="ilustra"
            w={[, '70%', , , '100%']}
            justifySelf="center"
            ratio={539 / 609}
            mt={[, -32, , -64]}
            ml={[, , , -10]}>
            <Image src="/images/index/home-blog-bkg-alt.png" layout="fill" objectFit="contain" quality="100" />
          </AspectRatio>
          <Box gridArea="titulo">
            <Display>{subtitulo}</Display>
          </Box>
          <Box gridArea="intro">
            {documentToReactComponents(conteudo)}
          </Box>
        </Grid>
        <Grid
          templateColumns={[, , , 'repeat(3, .33fr)']}
          templateRows={[, , , 'auto']}
          templateAreas={['"titulo . ." "principal principal principal" "titulo2 . ." "posts posts posts" "LinkMais LinkMais LinkMais"']}
          mt={16}
          rowGap={0}>
          <Heading
            as="h4"
            fontFamily="display"
            fontSize="2xl"
            fontWeight="500"
            color="primary.700"
            letterSpacing="tight"
            mb={3}
            textDecoration="underline"
            style={{ textDecorationColor: '#E59D23' }}
            w="fit-content"
            gridArea="titulo">Destaque do Blog</Heading>

          {posts.filter((post) => (post.fields.postDestaque)).slice(0, 1).map((post, i) => {
            return <PostDestaque key={i} post={post} />
          })
          }
          <Heading
            as="h4"
            fontFamily="display"
            fontSize="xl"
            fontWeight="500"
            color="primary.700"
            letterSpacing="tight"
            mt={12}
            textDecoration="underline"
            style={{ textDecorationColor: '#E59D23' }}
            w="fit-content"
            gridArea="titulo2">Outros posts</Heading>
          <Grid
            mt={[4]}
            gridArea="posts"
            templateColumns={["auto", "repeat(auto-fit, minmax(45%, 1fr))", "repeat(auto-fit, minmax(28%, 1fr))"]}
            templateRows="auto auto"
            gap={6}

          >

            {posts.filter((post) => (!post.fields.postDestaque))
              .slice(0, 3)
              .map((post, i) => {

                return (
                  <PostsSecundarios key={i} post={post} transitions={transitions} />
                )
              })
            }
          </Grid>
          

          
        </Grid>
        <Tooltip
          shouldWrapChildren 
          hasArrow
          arrowSize={10}
          openDelay={300}
          placement="right"
          bgColor="primary.500"
          label="Quer ler mais posts? Visite nosso blog!">
          <Link href="/blog">
            <Button 
              maxW={32}
              mr={2}
              mt={[6, 0 ]}
              fontFamily="display"
              fontWeight="400"
              letterSpacing="tight"
              color="primary.600">Leia Mais</Button>
          </Link>
        </Tooltip>
      </Container>
    </Box>
  )
}

export default HomeBlog


