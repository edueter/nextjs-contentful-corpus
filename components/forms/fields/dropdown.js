import { useState } from 'react'
import { Box, Select } from '@chakra-ui/react'

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const onOptionSelected = option => () => {
    setSelectedOption(option);
  }

  return (
    <Box as="label" h="fit-content" className="dropdown--label">
      <Select
        color="primary.500"
        borderColor="primary.500"
        mt={1}
        fontFamily="display"
        fontWeight="400"
        letterSpacing="tight"
        transition="all .2s ease-in-out"
        focusBorderColor="secondary.500"
        variant="flushed"
        size="lg"
        placeholder="Escolha um assunto" >
        {options.map((option, i) => { return <option value={option} key={i} onClick={onOptionSelected(option)}>{option}</option> })}
      </Select>
      {selectedOption === 'Outros' && <TextInput label="Insira aqui o seu assunto" />}
    </Box>
  )
}

export default Dropdown