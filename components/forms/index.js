import { useState } from 'react'
import { Stack, Button, Text, Textarea, Input, Select } from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { transporte } from '../../helpers/mailer/transporte'


const transitions = {
  input: 'all .25s .15s ease-in-out',
  textarea: 'border .25s .15s ease-in-out'
}

const Required = ({ msgRequired }) => {
  return (
    <Text
      as="span"
      pos="absolute"
      right={0}
      fontStyle="italic"
      letterSpacing="wide"
      color="grayBlue.700"
      bottom={-5}
      fontSize="xs">{msgRequired || 'Campo obrigatório'}</Text>
  )
}

const CustomInputField = ({ onChange, inputField }) => {
  const { required, placeholder, label } = inputField.fields
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
    <Stack as={!label ? 'div' : 'label'} pos="relative">
      {label &&
        <Text
          as="span"
          transition={transitions.input}
          pos="absolute"
          left={isTouched === true ? 0 : 1}
          bottom={isTouched === true ? -5 : 2}
          fontSize={isTouched === true ? 'sm' : 'lg'}
          color={isFocused === true ? "secondary.500" : "primary.500"}>{label}</Text>}
      <Input
        pos="relative"
        placeholder={!label ? placeholder : ''}
        transition={transitions.input}
        _placeholder={{
          transition: transitions.input,
          color: 'primary.500'
        }}
        _focus={{
          _placeholder: {
            color: 'terciary.600'
          },
          borderColor: 'secondary.300'
        }}
        onFocus={toggleTouch}
        onBlur={toggleFocus}
        onChange={onChange}
      />
      {required && <Required />}
    </Stack>
  )
}

const CustomTextArea = ({ onChange, inputField }) => {
  const { required, placeholder } = inputField.fields
  return (
    <Stack pos="relative">
      <Textarea
        placeholder={placeholder}
        resize="vertical"
        transition={transitions.textarea}
        pl={1}
        pr={1}
        _placeholder={{
          transition: transitions.textarea,
          color: 'primary.500',
        }}
        _focus={{
          _placeholder: {
            color: 'terciary.600'
          },
          borderColor: 'secondary.300'
        }}
        onChange={onChange}
      />
      {required && <Required />}
    </Stack>
  )
}

const CustomDropdown = ({ inputField, onSelect }) => {
  const { options, label, required } = inputField.fields
  return (
    <Stack>
      <Select
        placeholder={label && label}
        onSelect={onSelect}
        focusBorderColor="secondary.300"
      >
        {options.map((option, i) => {
          return <option value={option} key={i}>{option}</option>
        })}
      </Select>
      {required && <Required />}
    </Stack>
  )
}

const Form = ({ comp }) => {
  //const { destinatario, formId, textoBotao, input } = componentes.fields
  //const { label, inputIdName, required, tipo } = input.fields
  //* Teste de validação: se o componente passado não for um compForm, o mesmo retorna erro
  const { id } = comp.sys.contentType.sys

  if (id !== 'compForm') {
    return <Text as="span" color="red.500">Erro: componente passado não corresponde ao correto. Verifique a entrada de 'comp' no componente Form.</Text>
  } else {
    const { destinatario, formId, input, textoBotao, referencia } = comp.fields
    console.log("Componente " + referencia + " carregado corretamente.")

    const { control, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
      <form id={formId}>
        <Stack spacing={8}>
          {input.map((inputField, i) => {
            const { id } = inputField.sys.contentType.sys
            const { inputIdName, tipo, required, placeholder } = inputField.fields
            if (id === "formInput" && tipo === "Caixa de texto") {
              return (
                <Controller
                  key={i}
                  name={inputIdName}
                  control={control}
                  rules={{ required: required }}
                  render={props => (
                    <CustomTextArea
                      onChange={e => props.onChange(e.target.checked)}
                      inputField={inputField}
                    />
                  )
                  }
                />
              )
            } if (id === "formInput") {
              return (
                <Controller
                  key={i}
                  name={inputIdName}
                  control={control}
                  rules={{ required: required }}
                  render={props => (
                    <CustomInputField
                      onChange={e => props.onChange(e.target.checked)}
                      inputField={inputField}
                    />
                  )}
                />
              )
            } if (id === "formInput" && tipo === 'E-Mail') {
              
              return (
                <Controller
                  key={i}
                  name={inputIdName}
                  control={control}
                  rules={{ required: required }}
                  render={props => (
                    <CustomInputField
                      onChange={e => props.onChange(e.target.checked)}
                      inputField={inputField}
                    />
                  )}
                />
              )
            } if (id === "formDropdown") {
              return (
                <Controller
                  key={i}
                  name={inputIdName}
                  control={control}
                  rules={{ required: required }}
                  render={props => (
                    <CustomDropdown
                      onSelect={e => props.onChange(e.target.value)}
                      inputField={inputField}
                    />
                  )}
                />
              )
            }
          })}

          <Button
            type="submit"
            colorScheme="primary"
            w="fit-content"
            px={6}
            focusBorderColor="secondary.300"
            onPress={handleSubmit(onSubmit)}>{textoBotao}</Button>
        </Stack>
      </form>
    )
  }
}

export default Form
