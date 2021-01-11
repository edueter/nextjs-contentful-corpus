//* Chakra-ui
import PropTypes from "prop-types";
import { Box, Button, Text } from '@chakra-ui/react'
import { ArrowLeftIcon } from '@chakra-ui/icons'
//* Rich Text Tools
import { options } from '../../utils/textRenderer'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const BlockWithExcerpt = ({ animation, colors, transition, excerpt, autor }) => {
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

BlockWithExcerpt.propTypes = {
  animation: PropTypes.any,
  autor: PropTypes.shape({
    fields: PropTypes.shape({
      nome: PropTypes.any
    })
  }),
  colors: PropTypes.shape({
    categorias: PropTypes.shape({
      effect: PropTypes.any
    }),
    ribbon: PropTypes.any,
    text: PropTypes.any
  }),
  excerpt: PropTypes.any,
  transition: PropTypes.shape({
    delayed: PropTypes.any,
    timer: PropTypes.any
  })
}

export { 
  BlockWithExcerpt
}
