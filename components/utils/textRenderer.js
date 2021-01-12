import { Text } from '@chakra-ui/react'
import { MARKS, BLOCKS } from '@contentful/rich-text-types'

export const stdOptions ={
  renderMark: {
    [MARKS.BOLD]: text => <Text as="b" color="primary.700">{text}</Text>,
    [MARKS.ITALIC]: text => <Text as="i">{text}</Text>,
    [MARKS.UNDERLINE]: text => <Text as="u">{text}</Text>
  }
}

export const options = {
  frontPage: {
    blog: {
      destaque: {
        renderMark: stdOptions,
        renderNode: {
          [BLOCKS.PARAGRAPH]: (_node, children) => {
            return ( 
            <Text
              fontSize="md"
              fontFamily="body"
              color="grayBlue.700"
              letterSpacing="normal"
              lineHeight={6}
              fontWeight="400"
              maxH={72}
            >{children}</Text>
            ) 
          }
        }
      }
    }
  }
}