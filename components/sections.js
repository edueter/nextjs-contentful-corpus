// components/sections.js
import PropTypes from "prop-types";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import getEntry from '../helpers/loaders/entry'

export const Section = ({
  slug, 
  titulo,
  subtitulo,
  conteudo,
  componentes,
  id
}) => {
  
  return (
    <section id={slug} key={id}>
      <h1>{titulo}</h1>
      <h2>{subtitulo}</h2>
      <div>{documentToReactComponents(conteudo)}</div>
      <ul>
        {componentes.map((componente) => { 
          const { id } = componente.sys
          return (
            <li key={id}>
              {getEntry(id)}
            </li>
            )
         })}
      </ul>
      
    </section>
  )
}
Section.propTypes = {
  componentes: PropTypes.any.isRequired,
  conteudo: PropTypes.any.isRequired,
  slug: PropTypes.any.isRequired,
  subtitulo: PropTypes.any.isRequired,
  titulo: PropTypes.any.isRequired
}


export default Section