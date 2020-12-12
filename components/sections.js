// components/sections.js
// import PropTypes from "prop-types";
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const RenderSection = ({ data }) => {
  const { titulo, slug, subtitulo} = data.fields

  return (
    <section id={slug}>
      <h1>Essa é a seção {slug}</h1>
      <h2>Com o título {titulo},</h2>
      <h2>subtítulo {subtitulo}</h2>
    </section>
  )
}



export default RenderSection