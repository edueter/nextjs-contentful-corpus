// components/home/hero.js
// Chakra utils
import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  AspectRatio, 
  Spacer,
  } from '@chakra-ui/react'
// FX
import Typewriter from '../effects/typewritter'
// Contentful tools
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { MARKS, BLOCKS } from '@contentful/rich-text-types'
// Custom components
import { Container } from '../layout'
import BackgroundImage from '../utils/background'

import MainMenu from '../layout/nav/'


const Hero = ({ secao }) => {
  const { titulo, conteudo, slug, componentes } = secao.fields
  const navBar = componentes[2].fields

  const options = {
    renderText: text => text.replace(/^[\s\xa0 ]+/g, ''),
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => {
        return (
          <Text 
            color="grayBlue.700" 
            fontSize={['1rem', '', "1.1275rem"]}
            lineHeight="1.68em" 
            letterSpacing="normal"
            whiteSpace="break-spaces"
            wordBreak="break-word"
            _notFirst={{ mt: 2 }}
            textAlign={'justify', '', '', 'left'}
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
  return (
    <Box as="section" id={slug} position="relative" minH="auto" id={secao}>
      <MainMenu navBar={navBar} />
      <BackgroundImage 
        zIndex="-50"
        w="100%"
        h={['26rem', '', '70vh', "100vh"]}
        pos={["relative", '', "absolute"]} 
        top="0"
        whiteSpace="nowrap"
        left={['0', '','42%', "48%"]}
        bgImage={["url('/images/index/bkgHero_alt.png')", '', '', "url('/images/index/bkgHero.png')"]}
        bgPosition={['top center', '', '0% 50%', 'top left']}
        bgSize={['contain', '', '55%', '130%', 'cover']}
        bgRepeat="no-repeat"
        className="hero"/>
      <Container>
        <Flex 
          className="hero--content"
          h={['auto', '',  '', '67vh', '90vh']} 
          flexWrap="wrap" alignItems="center" 
          justifyContent={['center', '', 'flex-start', ]}>
          <Box 
            className="hero--content--wrapper"
            w={['100%']} 
            maxW={['', '', '38ch', '65ch']}
            alignSelf={['start', '', 'center']} 
            h={['auto', '', 'fit-content', "70%"]}>
            <Heading 
              as="h1" 
              maxW={['12ch', '28ch', '12ch', '28ch' ]} 
              fontFamily="display" 
              fontSize={['4xl', '4xl']} 
              fontWeight="500"
              letterSpacing="tight" 
              lineHeight="1em"
              color="primary.500" 
              >
              {titulo} <Text fontWeight="600" as="span"><Typewriter>{componentes[1].fields.palavras}</Typewriter></Text>
            </Heading>
            <Box 
              className="contentful--text" mt={4} >
                {documentToReactComponents(conteudo, options)}
            </Box>
          </Box>

        </Flex>
        
      </Container>
      
    </Box>
  )
}

export default Hero