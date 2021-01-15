import Form from '../forms/'
// Chakra utils
import {
  AspectRatio,
  Box, Icon, Heading, Grid, Text, GridItem, Accordion, AccordionItem, AccordionIcon, AccordionButton, AccordionPanel, Spacer, Stack, Input, Select, Textarea, Button
} from '@chakra-ui/react'
import Link from 'next/link'
// Contentful tools
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types'
import snakeCase from 'lodash/snakeCase'
// Custom components
import { Container, Display } from '../layout'

import { Map, GoogleApiWrapper } from 'google-maps-react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const CentralDeAtendimento = ({ secao }) => {
  const options = {
    renderText: text => text.replace(/^[\s\xa0 ]+/g, ''),
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node, children) => {
        return (
          <Text
            color="grayBlue.700"
            fontSize="md"
            lineHeight="1.73333em"
            letterSpacing="normal"
            fontWeight="400"
            whiteSpace="break-spaces"
            wordBreak="break-word"
            textAlign="left"
            _notFirst={{ mt: 2 }}
            w="100%">{children}</Text>
        )
      },
      [INLINES.HYPERLINK]: (node) => {
        return (
          <Link href={node.data.uri}>
            <Text
              cursor="pointer"
              color="primary.600"
              fontWeight="500"
              textDecoration="underline"
              transition="color .15s .15s ease-in-out"
              _hover={{
                color: 'secondary.600',
              }}
              as="span">
              {node.content[0].value}
            </Text>
          </Link>
        )
      }
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
    renderText: text => text.replace('´$nbsp;´', ' ')
  }

  console.log(secao.fields)
  const { subtitulo, conteudo, slug, componentes } = secao.fields


  return (
    <Box
      as="section"
      id={slug}
      bgColor="terciary.400"
      position="relative"
      maxW="100%"
      h="100%"
      pt={[40, , "18rem"]}
      alignContent="flex-start"
      pb={[32]}
    >

      <Box
        bgColor="babyBlue.600"
        className="section--divider central"
        pos="absolute"
        top="0"
        left="0"
        right="0"
        zIndex="0"
        width="100%"
        height={['4rem', "10rem"]}
        transform="rotateZ(180deg)"
        style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }}
      ></Box>
      <Container zIndex="400">
        <Grid templateColumns={['auto', , 'repeat(2, .5fr)']} gap={6}>
          <GridItem colSpan={1} className="col--1 unidades mapas texto">
            <Display>Central de Atendimento</Display>
            {documentToReactComponents(conteudo, options)}
            <Heading
              mt={4}
              mb={2}
              fontSize="lg"
              fontWeight="500"
              as="h4">Conheça nossas unidades</Heading>
            <Accordion allowMultiple >

              {componentes.slice(0, 2).map((unidade, i) => {
                const { nome, local, endereco1, endereco2, crefito, coordenadas, cep } = unidade.fields
                const { lat, lon } = coordenadas
                return (
                  <AccordionItem id={snakeCase(nome)} defaultIndex={[0]} key={i} _first={{ borderTop: 0 }}>
                    <AccordionButton pl={1}>
                      <Heading as="h3" fontFamily="display" color="primary.600" fontWeight="400" fontSize="xl">{nome}</Heading>
                      <Spacer />
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pl={1}>
                      <Text>
                        Endereço: <Text as="b" color="primary.600">{local},</Text> {endereco1}. {endereco2}.</Text>
                      <Text>CEP: {cep}</Text>
                      <AspectRatio mt={2} ratio={16 / 9}>
                        <Box pos="relative" role="group">
                          <Icon
                            as={FaMapMarkerAlt}
                            _groupHover={{
                              color: 'secondary.500'
                            }}
                            mt={-5}
                            w={10}
                            h={10}
                            color="primary.200"
                            transition="color .15s .15s ease-in-out"
                            pos="absolute"
                            zIndex={100} />
                          <Map
                            style={{ zIndex: 10 }}
                            google={google}
                            zoom={16}
                            initialCenter={{
                              lat: lat,
                              lng: lon
                            }} />
                        </Box>

                      </AspectRatio>
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </Accordion>

          </GridItem>
          <GridItem colSpan={1} className="col--2 form">

            <Form comp={componentes[2]} />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

const ApiCorpus = process.env.NEXT_PUBLIC_GOOGLEMAPS_API

export default GoogleApiWrapper({
  apiKey: (ApiCorpus)
})(CentralDeAtendimento)