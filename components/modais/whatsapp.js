
import { useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { 
  IconButton, 
  Tooltip, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure, 
  Box,
  Text,
  Flex,
  Image,
  HStack
  } from "@chakra-ui/react"

import { ImWhatsapp } from "react-icons/im"
import { MdSend } from "react-icons/md"

import { keyframes } from '@emotion/react'
import { Slide } from 'react-awesome-reveal'

const slideUp = keyframes`
from {
  transform: translateY(500%);
}
to {
  transform: translateY(0);
}
`;

const WhatsappButton = ({ onOpen }) => {
  return (
    <Tooltip 
      hasArrow 
      label="Clique aqui para entrar em contato via WhatsApp" 
      placement="left"
      openDelay={300}
      fontSize="sm">
      <IconButton 
      onClick={onOpen}
      zIndex="1000"
      position="fixed" 
      bottom="8vh" 
      right="3vw" 
      color="white" 
      bgColor="whatsapp.tealgreen.1" 
      fontSize="1.5rem" 
      size="2.5rem"
      rounded="3rem" 
      p={3} 
      _hover={{
        cursor: 'pointer',
        bgColor: 'whatsapp.tealgreen.2',
        transform: 'translateX(2px) translateY(2px)',
        transformOrigin: 'bottom right',
      }}
      className="whatsapp--click"
      aria-label="WhatsApp Window" icon={<ImWhatsapp />} />
    </Tooltip>
  )
}
const WhatsappModal = ({ isOpen, onClose, conversa, mensagem, nomeContato, onChange, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent 
        bgColor="whatsapp.tealgreen.2">
        <ModalHeader 
          color="white" 
          fontSize="md" 
          px={4}
          py={2}

          letterSpacing="wide" 
          fontWeight="300">
            <HStack>
              <Image 
                src="images/Logo_Corpus.png" 
                bgColor="white" 
                alt="logo Corpus" 
                rounded={64} 
                boxSize={10}
                objectFit="contain"/>
              <Text as="span" fontSize="lg" fontWeight="300">{nomeContato}</Text>
              <ModalCloseButton color="white" mt={4} />
            </HStack>
          </ModalHeader>
        <ModalBody
          overflow="hidden"
          px={0}
          py={0}>
          <Conversa conversa={conversa} />
        </ModalBody>
        <EnviarMensagem 
          mensagem={mensagem} 
          onChange={onChange} 
          onSubmit={onSubmit} />
      </ModalContent>

    </Modal>
  )
}
const Conversa = ({ conversa }) => {
  return (
    <Flex
      w="100%"
      h="100%"
      as="div"
      className="whatsapp--chat-window"
      py={3}
      px={4}
      flexDir="col" 
      flexWrap="wrap"
      alignContent="flex-end"
      minH="40vh"
      rounded="md"
      roundedTop="0"
      bgSize="cover"
      bgImg="url('images/modais/whatsapp/bkg.jpg')">
        {conversa.map((item) => {
          const {mensagem, direction, id} = item
          return (
            <BubbleMensagem i={id} direction={direction}>
              {mensagem}
            </BubbleMensagem>
          )
        })}
        
    </Flex>
  )
}

const BubbleMensagem =({ children, direction, className, i }) => {
  const time = 250
  const delay = {i} < 1 ? (time) : (time * i * 2)
  return (
  <Slide
    className="animation"
    style={{width: '100%'}}
    key={i}
    keyframes={slideUp}
    triggerOnce
    delay={delay}>
    
    <Box
      className={`bubble--message-wrapper ${!className ? '' : className}`}
      bgColor={direction === 'received' ? 'white' : 'whatsapp.lightgreen.2'}
      fontSize="sm"
      maxW="70%"
      ml={direction !== 'received' ? 'auto' : '0'}
      w="fit-content"
      p={2}
      mb={3}
      rounded="lg"
      boxShadow="lg"
      roundedTopLeft={direction === 'received' ? '0' : 'lg'}
      roundedTopRight={direction !== 'received' ? '0' : 'lg'}
      color={direction === 'received' ? 'gray.700' : 'white'}>
      {children}
    </Box>
  </Slide>  
  

  )
}

const mensagensIniciais = [
  {
    mensagem:  "Olá! Ficamos felizes que você tenha entrado em contato",
    direction:   "received"
  },
  {
    mensagem:  "Para que possamos realizar uma triagem adequada, pedimos que, por favor, digite abaixo qual o seu problema",
    direction:   "received"
  },
]

const EnviarMensagem = ({ mensagem, onChange, onSubmit }) => {
  
  
  const CampoDeTexto = () => {
    return (
      <Input 
        key={Math.random}
        zIndex="1500"
        type="text"
        onChange={onChange}
        value={mensagem}
        pos="absolute"
        left={4}
        w="90%"
        size="sm" 
        rounded="2xl"
        bgColor="white"
        focusBorderColor="whatsapp.lightgreen.1"
        placeholder="Digite aqui sua mensagem" /> 
    )
  } 
  const Botão = () => {
    return (
      <IconButton 
        onClick={onSubmit}
        zIndex="2000"
        pos="absolute"
        right={4}
        aria-label="Enviar"
        rounded="8rem"
        padding={1}
        fontSize="1.75rem"
        color="white"
        transform="rotateZ(-30deg)"
        bgColor="whatsapp.lightgreen.1"
        _hover={{
          bgColor: 'whatsapp.lightgreen.2',
          transform: 'rotateZ(-45deg)',
        }}
        icon={<MdSend />}/>
    )
  } 

  return (
    <ModalFooter
      pos="relative"
      h={12}
      px={4}
      py={3}>
      <CampoDeTexto />
      <Botão />
    </ModalFooter>
  )
}

const Whatsapp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ conversa, setConversa ] = useState(mensagensIniciais);
  const [ mensagem, setMensagem ] = useState('');
  
  const handleChange = (e) => {
    e.preventDefault();
    setMensagem(e.target.value);
  }
  
  function openUrl({ text }) {
    //const tel = 5561991108778
    const tel = process.env.NEXT_PUBLIC_CORPUS_CONTATO
    return ('https://api.whatsapp.com/send?phone=' + tel + '&text=' + text)
  }

  const handleSubmit = () => {
    const novaConversa = conversa.concat({ mensagem, type: 'sent', id: uuidv4() });
    setConversa(novaConversa);
    setMensagem('');
    setTimeout(() => {
      location.href = openUrl(mensagem)
    }, 2000)  
  }
    
  return ( 
    <>
      <WhatsappButton onOpen={onOpen} />
      <WhatsappModal
        nomeContato="Corpus Fisioterapia & Pilates"
        isOpen={isOpen} 
        onClose={onClose} 
        conversa={conversa}
        mensagem={mensagem}
        onChange={handleChange}
        onSubmit={handleSubmit} />
    </>
  )
}

export default Whatsapp