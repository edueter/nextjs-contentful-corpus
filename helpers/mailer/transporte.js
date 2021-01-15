import nodemailer from 'nodemailer'

export var transporte = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_GMAIL_AUTH_LOGIN,
    PASS: process.env.NEXT_PUBLIC_GMAIL_AUTH_PASSWD
  }
});

var email = { 
  from: 'eduardo.o.carvalho@gmail.com',
  to: 'eduardo@eter.ppg.br',
  subject: 'Node.js ♥ unicode', 
  html: 'E-mail foi enviado do <strong>Node.js</strong>'
};

transporte.sendMail(email, function(err, info){
  if(err)
    throw err;
  console.log('Email enviado! Leia as informações adicionais: ', info);
})