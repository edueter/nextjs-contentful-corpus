// components/layout/nav/index.js
// navigation wrapper
// Next.js tools
import Image from 'next/image'
// Chakra-UI components
import { Flex, Box, Spacer, AspectRatio } from '@chakra-ui/react'
// Custom components
import { DrawerLink, LinkPlural, LinkSingular } from './links'
import { DrawerMenu } from './mobile'
import { RegularMenu } from './desktop'
import { Container } from '../../layout'

export const MainMenu = ({ navBar, id }) => {
  
  return (
    <Container>
      <Flex 
        as="header" 
        flexDir="row" 
        alignItems="center"
        justifyContent="flex-start"
        h="auto"
        pt={8}
        mt={0}>
        <Box 
          flexBasis="15%"
          className="branding Logo">
          <AspectRatio 
            ratio={9/7} 
            w={['4rem', '8rem', '12rem', '11rem']}
            objectFit="contain">
            <Image src="/images/Logo_Corpus.png" layout="fill" objectFit="contain" />
          </AspectRatio>
        </Box>

        <RegularMenu navBar={navBar} />
        
        <Spacer display={['block', '', '', 'none']} />
        <DrawerMenu navBar={navBar} />
        
      </Flex>
    </Container>
  )
} 

export default MainMenu
export { 
  DrawerLink,
  DrawerMenu,
  LinkPlural,
  LinkSingular,
  RegularMenu
 }