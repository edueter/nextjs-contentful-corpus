// components/layout/navigation/mobile.js
// Navigation for mobile devices

// React hooks 
import { useState, useRef } from 'react'
// Chakra-UI components
import {  
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, 
  IconButton,
  useDisclosure,
  Button,
  Text,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  List,
} from '@chakra-ui/react'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
// custom components
import { DrawerLink } from './links'

export function DrawerMenu({ navBar }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnMenu = useRef()

  return (
    <>
      <Tooltip
      shouldWrapChildren
      label="Clique para ver o menu"
      openDelay={500}
      placement="left-end"
      bgColor="primary.100"
      color="primary.500"
    >
      <IconButton 
        ref={btnMenu} 
        color="primary.500"
        bgColor="white"
        borderColor="primary.300"
        border={2}
        variant="outline"
        fontSize="1.5rem"
        display={['block', '', '', 'none']}
        onClick={onOpen} 
        aria-label="menu" icon={<HamburgerIcon />}/>
    </Tooltip>
      
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnMenu}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
                <DrawerHeader>
                  <Text as="span" fontSize="sm" color="primary.400" fontWeight="300">Navegue pelo menu</Text>
                </DrawerHeader>
              <DrawerBody px="0" >
                <List spacing={1} listStyleType="none" colorScheme="primary">
                  {navBar.links.map((link, i) => {
                    const { nome, href, sub } = link
                    const subTest = sub === "" ? true : false
                    if(subTest === true) {
                      return (
                        <DrawerLink href={href} nome={nome} i={i} />
                      )  
                    } else {
                      const [ isOpen, setIsOpen ] = useState(false);
                      const toggling = () => setIsOpen(!isOpen);

                      return (
                        <Accordion allowToggle={true}>
                          <AccordionItem>
                            <AccordionButton px={6} onClick={toggling}>
                              <DrawerLink noPadding href={href} nome={nome} i={i} />
                              <ChevronDownIcon 
                                w={5}
                                h={5}
                                ml={2}
                                color="primary.500"
                                transition="transform .1s .15s ease-in-out"
                                transform={isOpen === true ? "rotateZ(180deg) rotateY(180deg)" : "rotateZ(0deg) rotateY(0deg)"}
                                />
                            </AccordionButton>
                            <AccordionPanel pb={2}>
                              <List px={6} spacing={0} listStyleType="none" colorScheme="primary">
                                {sub.map((subLink, i) => {
                                  const { nome, href } = subLink
                                  return <DrawerLink noPadding href={href} nome={nome} i={i} />
                                })}
                              </List>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      )
                    }
                  })}

                </List>
              </DrawerBody>
              <DrawerFooter>
                <Button colorScheme="primary">
                  <Text as="span" fontWeight="300" textTransform="uppercase" fontFamily="display" letterSpacing="wide" >Entre em contato</Text>
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
      </Drawer>
    </>
  )
}