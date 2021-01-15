import { Button } from '@chakra-ui/react';
import { transporte } from '../helpers/mailer/transporte'

var email = {
  from: 'eduardo@eter.ppg.br',
  to: 'eduardo.o.carvalho@gmail.com',
  subject: 'Node.js ♥ unicode', 
  html: 'E-mail foi enviado do <strong>Node.js</strong>'
}

const submit = transporte.sendMail(email, function(err, info){
  if(err)
    throw err;

  console.log('Email enviado! Leia as informações adicionais: ', info)
})

const Mailer = () => {
  return <Button onSubmit={submit} />
}

export default Mailer