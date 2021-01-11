import { Box } from '@chakra-ui/react'
export const Container = ({children, h, zIndex}) => {
  return (
    <Box 
      px={[4, '', 6, '', '' ]}
      maxW={['', '768px', '1140px', '1440px', '' ]}
      mx="auto"
      h={h}
      zIndex={zIndex}
      className="container layout--tool">
      {children}
    </Box>
  )
}

