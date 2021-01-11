import { Heading } from '@chakra-ui/react'

const Display = ({ children }) => {
  return (
    <Heading
      as="h2"
      fontFamily="display"
      color="primary.600"
      fontWeight="500"
      letterSpacing="tight"
      >
      {children}
    </Heading>
  )
}

export { Display }

