// components/sections.js

// Grid of sections for the first page (index)

export const SectionRenderer = ({ secao }) => {
  const { titulo, slug, subtitulo} = secao.fields

  switch(secao.fields.slug) {
    case 'hero':
      return 'Hero';
    case 'fisioterapia-home':
      return 'fisio';
    case 'pilates':
      return 'pilates';
    case 'central-de-atendimento':
      return 'central-de-atendimento';
    default:
      return 'nothing came from render'
  }

  return (
    <section id={slug}>
      <h1>Essa é a seção {slug}</h1>
      <h2>Com o título {titulo},</h2>
      <h2>subtítulo {subtitulo}</h2>
    </section>
  )
}



export default SectionRenderer