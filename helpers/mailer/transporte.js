import nodemailer from 'nodemailer'

export var transporte = nodemailer.createTransport({
  service: 'Gmail',
  port: 587,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_GMAIL_AUTH_LOGIN,
    PASS: process.env.NEXT_PUBLIC_GMAIL_AUTH_PASSWD
  }
});
