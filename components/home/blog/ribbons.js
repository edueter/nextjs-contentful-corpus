import PropTypes from "prop-types";
import { Box, Text, UnorderedList, ListItem } from '@chakra-ui/react'
import Link from 'next/link'

const RibbonAutor = ({ children, colors, transition, pos, top, left, right, bottom, zIndex }) => {
  return (
    <Text
      as="h4"
      bgColor={colors.ribbonAutor}
      zIndex={zIndex}
      w="fit-content"
      pos={pos}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      px={4}
      py={0}
      fontSize="sm"
      transition={`all ${transition.timer}`}
      _groupHover={{
        bgColor: colors.hover.ribbon
      }}
    >
      Por: {children}
    </Text>
  )
}

const RibbonCategoria = ({ categorias, transition, colors, pos, top, left, right, bottom, zIndex }) => {
  return (
    <UnorderedList
      listStyleType="none"
      boxShadow="lg"
      pos={pos}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      ml={0}
      zIndex={zIndex}
      bgColor={colors.ribbon}
      w="fit-content"
      display="flex"
      transition={`all ${transition}`}
      _groupHover={{
        bgColor: colors.hover.ribbon
      }}
      flexDir="row">
      <ListItem px={1} color="secondary.400" mt="-.1em">›</ListItem>
      {categorias.map((categoria, i) => {
        const { nome, slug } = categoria.fields
        return (
          <Link href={slug} key={i}>
            <ListItem
              pos="relative"
              px={1}
              _first={{
                ml: 1
              }}

              _after={{
                content: '","',
                color: colors.categorias.effect,
                pos: 'absolute',
                bottom: '.05em', right: '0',
              }}
              _last={{
                _after: {
                  display: 'none'
                }
              }}
              _hover={{
                cursor: 'pointer',
              }}>
              <Text
                _before={{
                  content: '""',
                  w: '94%',
                  h: "2%",
                  bgColor: 'secondary.500',
                  pos: "absolute",
                  bottom: '30%',
                  left: '3%',
                  right: '3%',
                  transformOrigin: 'center',
                  transform: 'scaleX(0)',
                  transition: 'transform .15s ease-in-out'
                }}
                _groupHover={{
                  color: colors.hover.text
                }}
                _hover={{
                  _before: {
                    transform: 'scaleX(1)'
                  }
                }}
                color={colors.text}
                fontFamily="display"
                fontWeight="400"
                letterSpacing="normal"
                fontSize="sm"
                textStyle="uppercase">
                {nome}
              </Text>
            </ListItem>
          </Link>
        )
      })}
    </UnorderedList>
  )
}


const RibbonCurve = ({ w, h, colors, bgColor, hoverBgColor, pos, top, left, right, bottom, zIndex, transition }) => {
  return (
    <Box
      className="ribbon--curve"
      display="block"
      zIndex={zIndex}
      pos={pos}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      h={h || 5}
      w={w || 5}
      transition={`all ${transition}`}
      bgColor={bgColor || colors.curve}
      _groupHover={{
        bgColor: hoverBgColor || colors.hover.curve
      }}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
    ></Box>
  )
}



const RibbonTitulo =  ({ children, colors, transition, pos, top, left, right, bottom, zIndex }) => {
  return (
    <Text
      bgColor={colors.ribbon}
      zIndex={zIndex}
      pos={pos}
      top={top}
      left={left}
      bottom={bottom}
      right={right}
      w={[, , , '20ch']}
      as="h3"
      fontFamily="display"
      fontWeight="400"
      lineHeight="1.1em"
      color={colors.text}
      fontSize="xl"
      px={3}
      py={1}
      boxShadow="lg"
      transition={`all ${transition.timer}`}
      _groupHover={{
        bgColor: colors.hover.ribbon,
        color: colors.hover.text
      }}
      className="post--title post--principal">
      {children}
    </Text>
  )
}


export { 
  RibbonAutor,
  RibbonCategoria,
  RibbonTitulo,
  RibbonCurve
}