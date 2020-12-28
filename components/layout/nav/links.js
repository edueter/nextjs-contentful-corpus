// components/layout/navigation/links.js
import { useState } from 'react'
// Next.js tools
import Link from 'next/link'
// Chakra-UI components
import { Link as ChakraLink, Box, UnorderedList, ListItem } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
// Outside-Click handler
import OutsideClickHandler from 'react-outside-click-handler';

export const DrawerLink = ({ href, nome, i, noPadding }) => {
  return (
    <Link href={href} i={i}>
      <ListItem
        data-title={nome}
        px={!noPadding ? 6 : 0 }
        pos="relative"
        fontFamily="display"
        textTransform="uppercase"
        fontWeight="300"
        letterSpacing="wide"
        color="primary.500"
        transition="color .15s .15s ease-in-out"
        
        _hover={{
          cursor: "pointer",
          color: "secondary.400"
        }}

        >{nome}</ListItem>
    </Link>
  )
}

export const LinkSingular = ({ nome, href, key }) => {
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

export const LinkPlural = ({ nome, href, sub, i }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  return (
    <Box as="div" pos="relative" key={i}>
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
          key={i}>
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