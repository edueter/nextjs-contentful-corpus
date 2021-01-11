import { Box, Text, UnorderedList, ListItem } from '@chakra-ui/react'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import { options } from '../../utils/textRenderer'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Link from "next/link"

const HomeImageDestaque = {
  destaque({ acessibilidade, url, zIndex }) {
    return (
      <AspectRatio
        top="0"
        left="0"
        bottom="0"
        right="0"
        zIndex={zIndex}
        transition={`all ${transition.timer}`}
        _grouphover={{
          filter: 'grayscale(.2)',
          transform: 'scale(1.01)'
        }}
        ratio={16 / 9} 
        w="100%">
          <Image src={`https:` + url} layout="fill" objectFit="cover" alt={acessibilidade}/>
      </AspectRatio>
    )
  }
}

const HomeRibbon = {
  curve({ w, h, bgColor, hoverBgColor, pos, top, left, right, bottom, zIndex }) {
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
        transition={`all ${transition.timer}`}
        bgColor={bgColor || colors.curve}
        _groupHover={{
          bgColor: hoverBgColor || colors.hover.curve
        }}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
      ></Box>
    )
  },
  autor({ children, pos, top, left, right, bottom, zIndex }) {
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
  },
  titulo({ children, pos, top, left, right, bottom, zIndex }) {
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
  },
  categorias({ categorias, pos, top, left, right, bottom, zIndex }) {
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
        transition={`all ${transition.timer}`}
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
}

const Blocos = {
  ImageWithExcerpt({ animation, colors, transition, excerpt, autor }) {
    return (
      <Box
        pos="absolute"
        top="0" left="0" bottom="0" right="0"
        overflow="hidden"
        role="group"
        zIndex={80}
        className="excerpt--wrapper">

        <Button
          className="animated--tag--button"
          animation={animation}
          bgColor={colors.ribbon}
          color={colors.text}
          pos="absolute"
          right="0" bottom="0"
          transition={`all ${transition.timer}`}
          size="xs"
          boxShadow="md"
          zIndex={500}
          p={1}
          mr={2}
          mb={2}
          _grouphover={{
            marginRight: "150px"
          }}
          textTransform="uppercase"
          fontFamily="display"
          fontWeight="400"
          alignSelf="flex-end"
        >
          <ArrowLeftIcon
            w={2}
            h={2}
            mr={1}
            color={colors.categorias.effect} />
          <Text mt="-.1rem">
            Ler mais
          </Text>
        </Button>

        <Box
          pos="absolute"
          top="0" right="0" bottom="0"
          transform="translateX(100%)"
          transition={`transform ${transition.delayed}`}
          w="42ch"
          minH="100%"
          py={4}
          px={5}
          _groupHover={{
            transform: 'translateX(2%)'
          }}
          fontSize="sm"
          bgColor="white">
          {documentToReactComponents(excerpt, options.frontPage.blog.destaque)}
          <Text
            lineHeight="1.2em"
            mt={2}
            fontFamily="display"
            w="fit-content"
            color="primary.600"
            borderBottomStyle="solid"
            borderBottomColor="secondary.400"
            borderBottomWidth="1px">
            Por: {autor.fields.nome}
          </Text>
        </Box>
      </Box>
    )
  }
}

export { Images, Ribbon, Blocos }