import { Box } from "@chakra-ui/react"

export const Layout = ({ children, id }) => {
  return (
    <Box 
      className="site--wrapper layout">
      <Box as="main" id={id} overflow="hidden" borderTopColor="primary.500" borderTopStyle="solid" borderTopWidth={ id === 'inicio' ? '.5rem' : 'none'}>
        {children}
      </Box>
      <Box as="footer" >
        (footer)
      </Box>
    </Box>
    
  )
}

export default Layout