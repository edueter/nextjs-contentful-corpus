import PropTypes from "prop-types";
import { useState } from 'react'
import { Stack, Text, Input, Textarea } from '@chakra-ui/react'
import safeJsonStringify from "safe-json-stringify";

const transition = {
  std: 'all .2s ease-in-out',
  delayed: 'all .2s .2s ease-in-out',
}

const InputField = ({ onChange, ref, errors, input  }) => {
  const { placeholder, name, type, label } = input.fields
  const [isTouched, setIsTouched] = useState(false)
  const [isFocused, setIsFocused] = useState('');
  const toggleTouch = () => {
    setIsTouched(true);
    setIsFocused(!isFocused);
  }
  const toggleFocus = () => {
    setIsFocused(!isFocused)
  }

  return (
    <Stack as="label" role="group" pos="relative" spacing={0}>
      {!label ? ''
        : (
          <Text
            as="span"
            pos="absolute"
            textTransform="capitalize"
            transition="all .2s ease-in-out"
            bottom={isTouched === true ? -5 : 2}
            fontSize={isTouched === true ? 'sm' : 'lg'}
            color={isFocused === true ? "secondary.500" : "primary.500"}
            fontFamily="display"
            letterSpacing="tight"
          >{label}</Text>
        )}
      <Input
        mt={!label ? '' : -16}
        onFocus={toggleTouch}
        onBlur={toggleFocus}
        ref={ref}
        size="md"
        variant="flushed"
        color="primary.500"
        fontFamily="display"
        _placeholder={{
          color: 'primary.600',
          transition: 'all .12s .12s ease-in-out'
        }}
        borderColor="primary.500"
        _focus={{
          _groupFocus: true,
          borderColor: 'secondary.500',
          _placeholder: {
            color: 'terciary.600'
          }
        }}
        type={type}
        name={name}
        onChange={onChange}
        placeholder={!label ? placeholder : ''}
      />
      {errors.exampleRequired && <span>This field is required</span>}
    </Stack>
  )
}

InputField.propTypes = {
  errors: PropTypes.shape({
    exampleRequired: PropTypes.any
  }),
  isRequired: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
  placeholder: PropTypes.any,
  ref: PropTypes.any.isRequired,
  type: PropTypes.any
}

const TextArea = ({ onChange, ref, control, input }) => {
  const { placeholder, name, type, label } = input.fields
  const [isTouched, setIsTouched] = useState(false)
  const [isFocused, setIsFocused] = useState('');
  const toggleTouch = () => {
    setIsTouched(true);
    setIsFocused(!isFocused);
  }
  const toggleFocus = () => {
    setIsFocused(!isFocused)
  }

  const errors = true
  const inputName = JSON.stringify(name)
  return (
    <Stack as="label" pos='relative' className="textArea--label">
      {!label ? ''
        : (
          <Text
            as="span"
            pos="absolute"
            bottom={isTouched === true ? -5 : 2}
            transition="all .2s ease-in-out"
            fontSize={isTouched === true ? 'sm' : 'lg'}
            fontFamily="display"
            letterSpacing="tight"
            transition={transition.delayed}
            color={isFocused === true ? "secondary.500" : "primary.500"}
          >{placeholder}</Text>
        )}
      <Textarea
        variant="flushed"
        resize="vertical"
        focusBorderColor="secondary.300"
        size="md"
        minH={isTouched === true ? 24 : 8}
        noOfLines={1}
        ref={ref}
        onFocus={toggleTouch}
        onBlur={toggleFocus}
        control={control}
        type={type}
        name={name}
        onChange={onChange}
        transition={transition.delayed}
        _focus={{
          bgColor: 'rgba(1,1,1,.0275)'
        }}
        placeholder={!label ? placeholder : '' } />
        {errors.inputName && <Text as="span" color="red.500" fontSize="xs" pos="absolute" bottom={-5} right={0}>Este campo é obrigatório</Text>}
    </Stack>
  )
}

TextArea.propTypes = {
  errors: PropTypes.any.isRequired,
  isRequired: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
  placeholder: PropTypes.any,
  ref: PropTypes.any.isRequired,
  type: PropTypes.any
}

export { InputField, TextArea }
