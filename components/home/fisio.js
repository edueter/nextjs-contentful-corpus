// components/home/hero.js
// Chakra utils
import { 
  Link as ChakraLink,
  AspectRatio,
  Box,
  Grid,
  Text,
  Heading,
  Flex,
  Spacer, 
  } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
// Contentful tools
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { MARKS, BLOCKS } from '@contentful/rich-text-types'
// Custom components
import { Container } from '../layout'

const FisioHome = ({ secao }) => {
  //const { titulo, conteudo, subtitulo, slug, componentes } = secao.fields
  
  const optionsMain = {
    renderText: text => text.replace(/^[\s\xa0 ]+/g, ''),
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => {
        return (
          <Text 
            color="grayBlue.700" 
            fontSize="sm"
            lineHeight="1.68em" 
            letterSpacing="normal"
            fontWeight="300"
            whiteSpace="break-spaces"
            wordBreak="break-word"
            textAlign="left"
            _notFirst={{ mt: 2 }}
            w="100%">{children}</Text>
            )
      },
    },
    renderMark: {
      [MARKS.BOLD]: text => {
        return <Text 
          as="b"
          wordBreak="keep-all" 
          color="primary.500">{text}</Text>
      },
      [MARKS.ITALIC]: text => {
        return <Text 
          as="i"
          wordBreak="keep-all"
          >{text}</Text>
      }, 
    },
  }

  const optionsCard = {
    renderText: text => text.replace(/^[\s\xa0 ]+/g, ''),
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => {
        return (
          <Text 
            color="grayBlue.700" 
            fontSize="md"
            lineHeight="1.45em" 
            fontFamily="display"
            letterSpacing="normal"
            fontWeight="200"
            whiteSpace="break-spaces"
            wordBreak="break-words"
            textAlign="left"
            _notFirst={{ mt: 2 }}
            w="100%">{children}</Text>
            )
      },
    },
    renderMark: {
      [MARKS.BOLD]: text => {
        return <Text 
          as="b"
          wordBreak="keep-all" 
          color="primary.500">{text}</Text>
      },
      [MARKS.ITALIC]: text => {
        return <Text 
          as="i"
          wordBreak="keep-all"
          >{text}</Text>
      }, 
    },
  }
  
  const { subtitulo, conteudo, slug, componentes } = secao.fields

  const Card = ({ card }) => {
    const { link, titulo, conteudo, textoDoLink } = card.fields
    return (
      <Link 
        href={'/${link}'}>
        <Flex 
          mt={[10]}
          className="fisio--card-home"
          bgColor="white"
          transition="all .15s .15s ease-in-out"
          _hover={{
            transform: "perspective(1200px) rotateY(-15deg)"
          }}
          flexDir="column"
          wrap="wrap"
          h="auto"
          borderColor="#00BCBA"
          borderWidth={1}
          borderStyle="solid"
          rounded="lg"
          padding={4}
          mr={[0, 8]}
          boxShadow="lg"
          
          >
          <Heading 
            fontSize="lg"
            fontFamily="display"
            fontWeight="500"
            letterSpacing="wide"
            mb={2}
            as="h3">{titulo}</Heading>
          {documentToReactComponents(conteudo, optionsCard)}
          <Spacer />
          <ChakraLink 
            color="secondary.600"
            _hover={{
              textDecoration: "none",
              color: "primary.500"
            }}
            marginLeft="auto" 
            mt={4} 
            href={link}>{textoDoLink}</ChakraLink>
        </Flex>
      </Link>
    )
  }

  return ( 
    <Box 
      as="section" 
      id={slug} 
      position="relative" 
      maxW="100%"
      mt={[20, 60, , ,]} 
      minH={['auto', '', '', '100vh']}>
      <AspectRatio 
        className="background--image"
        pos="absolute"
        zIndex="-50"
        top={[,'18px', '-42px', '0',  '10']}
        left={[,'-58%', '-44%', '-57%', '-50%']}
        width={[,'85%', '69%', '80%', '70%']}
        ratio={1400/996}>
        <Image 
          src="/images/index/fisio-home-bkg.png" 
          layout="fill" 
          quality="100"
          objectFit="contain" />
      </AspectRatio>
      <Container>
        <Grid 
          templateColumns={['1fr', '.3fr .7fr' , , 'auto .80fr','.15fr .85fr']}
          templateRows={['.15fr .2fr .65fr', , , '.2fr .3fr .5fr', '']}
          gap={[0, , , 8]}
          templateAreas={['"titulo" "conteudo" "cards"', '". titulo" ". conteudo" "cards cards"', ,'". titulo" ". conteudo" ". cards"']}>
          <Heading 
          textAlign="left"
          gridArea="titulo"
          justifySelf="self-start"
          w={[ "100%", , ,"20ch"]}
          as="h2" 
          fontFamily="display" 
          fontWeight="500"
          fontSize="4xl">{subtitulo}</Heading>
          <Box 
            justifySelf="self-start"
            w={["100%", , , "50ch"]}
            className="contentful--text" 
            gridArea="conteudo">
            {documentToReactComponents(conteudo, optionsMain)}
          </Box>
          <Grid 
            gridArea="cards"
            templateColumns={['auto', 'repeat(auto-fill, minmax(45%, 1fr))', , 'repeat(auto-fill, minmax(28%, 1fr))', '']} >
            {componentes.slice(1,4).map((card, i) => {
              return (<Card key={i} card={card} />)
            })}
          </Grid>
        </Grid>
        
      </Container>
      
    </Box>
  )
}

export default FisioHome