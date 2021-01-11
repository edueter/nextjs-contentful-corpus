// components/home/hero.js
// Chakra utils
import { 
  AspectRatio,
  Box, Flex, Heading, Text
  } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
// Contentful tools
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { MARKS, BLOCKS } from '@contentful/rich-text-types'
// Custom components
import { Container, Display } from '../layout'

const Pilates = ({ secao }) => {
  //const { titulo, conteudo, subtitulo, slug, componentes } = secao.fields
  
  const options = {
    renderText: text => text.replace(/^[\s\xa0 ]+/g, ''),
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => {
        return (
          <Text 
            color="corpus-grayish-blue.700" 
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
  
  console.log(secao.fields)
  const { subtitulo, conteudo, slug, componentes } = secao.fields
  
  
  return ( 
    <Box 
      as="section" 
      id={slug} 
      bgColor="corpus-baby-blue.200"
      position="relative" 
      maxW="100%"
      h="100%"
      pt={[ 40, , "12rem"]}
      alignContent="flex-start"
      pb={[32]}
      >

        <Box bgColor="white"
          className="section--divider pilates"
          pos="absolute"
          top="0"
          left="0"
          right="0"
          zIndex="0"
          width="100%"
          height={['4rem',"10rem"]}
          transform="rotateZ(180deg)"
          style={{clipPath: "polygon(100% 0, 0% 100%, 100% 100%)"}}
          ></Box>
        
      <Container zIndex="400">
        <Flex 
          flexDir="column"
          justifyContent="center"
          h={['auto', , , '70vh']}>
          <Box 
            maxW={[, , "40%","51ch"]}
            className="pilates--content">
            <Display>
              {subtitulo}
            </Display>
            <Box 
              className="contententful-text"
              mt={4}
              >
              {documentToReactComponents(conteudo, options)}
            </Box>

          </Box>

        </Flex>
        
      </Container>    
      <AspectRatio 
          className="pilates--background"
          pos={["relative", , "absolute"]}
          top={[, , 0, "10px", "-100px"]}
          right={[, , "-30%", "0"]}
          width={["100%", , "90%", "63%" , "60%"]}
          ratio={1187/1124}>
          <Image src="/images/index/bkg-pilates.png" layout="fill" objectFit="contain" quality="100" />
        </AspectRatio>
    </Box>
  )
}

export default Pilates