import PropTypes from "prop-types";
import { Box, Flex, AspectRatio, UnorderedList, chakra, Text, Spacer, HStack, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import FormatData from '../../utils/formatData'

function PostDestaque({ post }) {
  
  const { titulo, slug, excerpt, autor, dataHora, categorias, imagemDestaque } = post.fields;
  const { url, details } = imagemDestaque.fields.arquivo.fields.file
  const { width, height } = details.image
  const { acessibilidade } = imagemDestaque.fields

 
  const transitions = {
    principal: "all .25s .05s ease-in-out",
    links: "all .25s .15s ease-in-out"
  }

  return (
    
    <Flex
      className="post--principal"
      h="auto"
      pos="relative"
      role="group"
      flexDirection="row"
      flexWrap="wrap"
      gridArea="principal">
      <AspectRatio 
        ratio={[13/9, , , 16/9]} 
        w={[ "100%", ,"70%"]}
        boxShadow="xl"
        borderWidth={[8, , , 16]}
        borderColor="primary.100"
        borderStyle="solid"
        transition={transitions.principal}
        _groupHover={{
          transform: 'scale(.92) rotateZ(-5.5deg)',
        }}
        >
        <Image 
          src={'https:' + url } 
          alt={acessibilidade} 
          layout="fill" 
          objectFit="cover" 
          objectPosition={ width === height ? 'top' : 'center'  }
          />
      </AspectRatio>
      <Flex 
      boxShadow="xl"
        pos={["relative", , "absolute"]} 
        right={0} 
        top={[, , '4%', ,"8%" ]}
        bottom={[, , , "8%" ]}
        bgColor="white" 
        py={5}
        px={4}
        role="group"
        mt={[-28, , '', ,]}
        mx={["auto", ,'' , '0', ]}
        w={['80%', , "50%", "40%"]} 
        h="auto"
        
        flexWrap="wrap"
        transform="scale(.95)"
        transition={transitions.principal}
        _groupHover={{
          transform: 'scale(1)'
        }}>
        <UnorderedList 
          w="fit-content"
          h={8}
          pos="relative"
          ml={-5}
          px={5}
          pt="3px"
          _before={{
            content: '""',
            pos: 'absolute',
            top: 0,
            bottom: 0,
            left: -3,
            h: 0,
            w: 0,
            borderLeftWidth: 8,
            borderRightWidth: 8,
            borderTopWidth: 18,
            borderBottomWidth: 18,
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
            right: 0,
            h: 0,
            w: 0,
            borderLeftWidth: 8,
            borderRightWidth: 8,
            borderTopWidth: 19,
            borderBottomWidth: 19,
            borderStyle: "solid",
            borderLeftColor: 'transparent',
            borderRightColor: 'white',
            borderTopColor: 'white',
            borderBottomColor: 'white',
          }}
          bgColor="secondary.300">
          {categorias.map((categoria, i) => {
            const { nome, slug } = categoria.fields
            return (
              <Link href={slug}>
                <chakra.a
                  color="primary.600"
                  fontFamily="display"
                  fontSize="sm"
                  fontWeight="300"
                  cursor="pointer"
                  pb=".1275rem"
                  borderBottomWidth={6}
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
        <Spacer />
        <Link href={slug}>
          <Text 
            as="span" 
            ml="auto" 
            mt={1}
            flexBasis="30%" 
            textAlign="right" 
            fontFamily="display" 

            cursor="pointer"
            color="primary.300"><FormatData dataHora={dataHora}/></Text>
        </Link>
        <Stack mb={[8, , 0]} h="60%">
          <chakra.h3 
          color="primary.500"
          fontWeight="600"
          letterSpacing="tight"
          fontSize="xl"
          >{titulo}</chakra.h3>
          <Text
            as="span"
            color="grayBlue.700"
            fontWeight="400"
            fontSize="sm"
          >Por: {autor.fields.nome}</Text>
          <Spacer flexBasis="100%" />
          {documentToReactComponents(excerpt, {
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

        </Stack>
        <Spacer flexBasis="100%" />
        <Link href={slug}>
          <chakra.a
            fontFamily="display"
            fontWeight="400"
            color="secondary.500"
            cursor="pointer"
            h="fit-content"
            ml="auto"
            alignSelf="flex-end"
            transition={transitions.links}
            _groupHover={{
              _hover:{
                color: 'primary.700'
              },
              color: 'primary.400'
            }}
          >Leia Mais</chakra.a>
        </Link>
      </Flex>
    </Flex>
  );
}


export { PostDestaque }
