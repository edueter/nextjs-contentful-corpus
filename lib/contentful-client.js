// lib/contentful-client.js
//import contentful from "contentful"
const { createClient } = require('contentful')

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
})

module.exports = client