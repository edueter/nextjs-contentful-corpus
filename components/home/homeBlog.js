//* Chakra-ui
import { AspectRatio, Box, chakra, Grid, Heading, ListItem, UnorderedList, Text, Flex } from "@chakra-ui/react"

//* NextJS
import Image from "next/image"
import Link from "next/link"

//* Contentful & Rich Text tools
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { MARKS, BLOCKS } from '@contentful/rich-text-types'

//* Components
import { Container, Display } from "../layout"
import { PostDestaque } from "./blog/PostDestaque"


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
      bgColor="babyBlue.400">
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
          templateRows={[, , , '.6fr .4fr']}
          templateAreas={['"principal principal principal" "posts posts posts"']}
          mt={16}
          gap={8}>


          {posts.filter((post) => (post.fields.postDestaque)).slice(0, 1).map((post, i) => {
            return <PostDestaque key={i} post={post} />
          })
          }
          <Grid

            gridArea="posts"
            templateColumns={["auto", , "repeat(auto-fit, minmax(28%, 1fr))"]}
            templateRows="auto"
            gap={6}
          >

            {posts.filter((post) => (!post.fields.postDestaque))
              .slice(0, 3)
              .map((post, i) => {
                const { titulo, slug, autor, categorias, artigo, imagemDestaque } = post.fields
                const { url, details } = imagemDestaque.fields.arquivo.fields.file
                return (
                  <Box key={i}
                    role="group"
                    transition={transitions.principal}
                    boxShadow="lg"
                    _hover={{
                      boxShadow: 'xl'
                    }}
                    bgColor="white">
                    <AspectRatio ratio={16 / 9} borderBottomColor="secondary.300" borderBottomStyle="solid" borderBottomWidth={1} >
                      <Image 
                        src={'https:' + url} 
                        alt={details} 
                        layout="fill" 
                        objectFit="cover" 
                        />
                    </AspectRatio>
                    <UnorderedList
                        w="fit-content"
                        h={6}
                        pos="relative"
                        mt={-3}
                        ml={-1}
                        pl={5}
                        pr={2}
                        pt=""
                        bgGradient="linear(to-r, secondary.300)"
                        _groupHover={{
                          bgColor: "transparent",
                          bgGradient: "linear(to-r, secondary.400, secondary.300, secondary.400)",
                          _before: {
                            borderRightColor: 'secondary.400',
                            borderTopColor: 'secondary.400',
                            borderBottomColor: 'secondary.400',
                          },
                          _after: {
                            borderLeftColor: 'secondary.400',
                          },

                        }}
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
                            <Link href={slug}>
                              <chakra.a
                                color="primary.600"
                                fontFamily="display"
                                fontSize="sm"
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
                                    content: '","',
                                    h: '100%'
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
                    <Flex
                      flexDir="column"
                      px={4}
                      py={3}
                    >
                      <Heading as="h3" 
                        fontSize="lg"
                        fontFamily="display"
                        fontWeight="600"
                        letterSpacing="tight"        
                        color="primary.600">{titulo}</Heading>
                      <Text 
                        as="span" 
                        fontSize="sm" 
                        color="grayBlue.700">por: {autor.fields.nome}</Text>
                      
                      <Box mt={3} isTruncated noOfLines="5">
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

                    </Flex>
                  </Box>
                )
              })
            }
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomeBlog


