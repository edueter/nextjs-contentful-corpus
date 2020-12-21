// React hooks 
import { useState } from 'react'
// NextJS utilities
import Link from 'next/link'
import Image from 'next/image'
// Outside-Click handler
import OutsideClickHandler from 'react-outside-click-handler';
// Chakra utils
import { 
  Link as ChakraLink, 
  Box, 
  Flex, 
  Heading, 
  Text, 
  UnorderedList, 
  ListItem, 
  AspectRatio, 
  HStack,
  Spacer} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
// FX
import Typewriter from '../effects/typewritter'
// Contentful tools
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types'
// Custom components
import { Container } from '../layout'

export const MainMenu = ({ navBar }) => {

  const LinkSingular = ({ nome, href, key }) => {
    return (
      <Link href={href}>
        <ChakraLink 
          pos="relative"
          display="block"
          _before={{
            content: '""',
            width: "0%",
            height: "1px",
            pos: "absolute",
            left: "0", bottom: "0", right: "0",
            bgColor: "primary.500",
            transformOrigin: "left",
            transition: "width .25s ease-in-out"
          }}
          _hover={{
            textDecoration: "none",
            textColor: "secondary.600",
            _before: { 
              width: "100%",
              bgColor: "secondary.600"
            }
          }}
          className="nav--link nav--first-level"
          as="a"
          color="primary.500"
          fontFamily="display" 
          fontWeight="300"
          letterSpacing="wide"
          textTransform="uppercase" 
          key={key}>{nome}</ChakraLink>
      </Link>
    )
  }
//
  const LinkPlural = ({ nome, href, sub, key }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
  
    return (
      <Box as="div" pos="relative" key={key}>
        <Link href={href}>
          <ChakraLink 
            onMouseEnter={toggling}
            pos="relative"
            display="block"
            _before={{
              content: '""',
              width: "0%",
              height: "1px",
              pos: "absolute",
              left: "0", bottom: "0", right: "0",
              bgColor: "primary.500",
              transformOrigin: "left",
              transition: "width .25s ease-in-out"
            }}
            _hover={{
              textDecoration: "none",
              textColor: "secondary.600",
              _before: { 
                width: "100%",
                bgColor: "secondary.600"
              }
            }}
            className="nav--link nav--first-level"
            as="a"
            color="primary.500"
            fontFamily="display" 
            fontWeight="300"
            letterSpacing="wide"
            textTransform="uppercase" 
            key={key}>
              {nome}
              <ChevronDownIcon 
                w={4}
                h={4}
                mt={-1}
                transition="transform .1s .15s ease-in-out"
                transform={isOpen === true ? "rotateZ(180deg) rotateY(180deg)" : "rotateZ(0deg) rotateY(0deg)"}
                />
          </ChakraLink>
        </Link>
        {isOpen && (
          <OutsideClickHandler onOutsideClick={toggling}>
            <UnorderedList 
              onMouseLeave={toggling}
              as="ul"
              bgColor="white"
              display={isOpen === true ? 'block' : 'none' }
              boxShadow="lg"
              pos="absolute"
              mt={2}
              ml="-.25rem"
              p={0}
              w="100%"
              zIndex="900"
              listStyleType="none">
              {sub.map((subLink, i) => {
                const { nome, href } = subLink
                return (
                  <Link href={href} key={i}>
                    <ListItem
                      w="100%"
                      >
                      <ChakraLink
                        w="100%"
                        h="auto"
                        px={2}
                        py={1}
                        display="inline-block"
                        className="nav--link nav--second-level"
                        as="a"
                        fontFamily="display" 
                        fontWeight="300"
                        letterSpacing="wide"
                        transition="all .2s ease-in-out"
                        textColor="primary.500"
                        _hover={{
                          textDecor: "none",
                          textColor: "secondary.200",
                          bgColor: "primary.500"
                        }}
                        textTransform="uppercase">
                        {nome}
                      </ChakraLink>
                    </ListItem>
                  </Link>
                )
              })}
            </UnorderedList>
          </OutsideClickHandler>
        )}
      </Box>
    )
  }

  
  navBar.links.map((link, i) => {
    const { sub } = link
    const subPresence = sub === "" ? true : false
    return console.log(subPresence)
  })
  
  
  return (
    <Container>
      <Flex 
        as="header" 
        flexDir="row" 
        alignItems="center"
        h="auto"
        pt={8}
        mt={0}>
        <Box 
          flexBasis="15%"
          className="branding Logo">
          <AspectRatio 
            ratio={9/7} 
            maxW="11rem"
            objectFit="contain">
            <Image src="/images/Logo_Corpus.png" layout="fill" />
          </AspectRatio>
        </Box>
        <Spacer />
        <HStack
          spacing={8}
          as="nav">
          {navBar.links.map((link, i) => {
            const { nome, href, sub } = link
            const subTest = sub === "" ? true : false
              if(subTest === true ) {
                return <LinkSingular nome={nome} href={href} key={i} /> 
              } else {
                return <LinkPlural nome={nome} href={href} sub={sub} key={i} />
              }
          })}
        </HStack>
        <Spacer />
      </Flex>
    </Container>
  )
}


const Hero = ({ secao }) => {
  const { titulo, conteudo, subtitulo, slug, componentes } = secao.fields
  const navBar = componentes[2].fields
  console.log("Conteúdo dessa seção")
  console.log(secao.fields)
  return (
    <Box as="section" position="relative" minH="100vh" id={secao}>
      <MainMenu navBar={navBar} />
      <Box
        zIndex="-50"
        w="100%"
        h="100vh"
        pos={["relative", '', '', "absolute"]} 
        top="0"
        left={['0', '', '', "48%"]}
        bgImage={["url('/images/index/bkgHero_alt.png')", '', '', "url('/images/index/bkgHero.png')"]}
        bgPosition="top left"
        bgSize="contain"
        bgRepeat="no-repeat"
        className="background--holder">
      </Box>
      <Container>
        <Flex h="100vh" flexWrap="wrap" alignItems="center">
          <Box w="50%" h="70%">
            <Heading as="h1" fontFamily="display" color="primary.500" fontWeight="500">
              {titulo} <Text fontWeight="600" as="span"><Typewriter>{componentes[1].fields.palavras}</Typewriter></Text>
            </Heading>
            <Box 
              color="corpus-grayish-blue.700"
              fontSize="1.25rem"
              lineHeight="2em"
              className="contentful--text">
                {documentToReactComponents(conteudo, {
                  renderMark: {
                    [MARKS.BOLD]: text => {
                      return <Text as="b" fontWeight="600">{text}</Text>;
                    } 
                  }
                })}
            </Box>
          </Box>

        </Flex>
        
      </Container>
      
    </Box>
  )
}

export default Hero