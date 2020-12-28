// components/layout/nav/desktop.js
// navigation for desktop devices
// Chakra-UI components
import { HStack } from '@chakra-ui/react'
// Custom components
import { LinkSingular, LinkPlural } from './links'

export const RegularMenu = ({ navBar }) => {
  return (
    <HStack
      className="navbar--wider-screens"
      display={['none', '', '', 'flex']}
      spacing={['', '', '', 4, 8]}
      ml={['', '', '', 2, 24]}
      as="nav">
      {navBar.links.map((link, i) => {
        const { nome, href, sub } = link
        const subTest = sub === "" ? true : false
        if (subTest === true) {
          return <LinkSingular nome={nome} href={href} i={i} />
        } else {
          return <LinkPlural nome={nome} href={href} sub={sub} i={i} />
        }
      })}
    </HStack>
  )
}