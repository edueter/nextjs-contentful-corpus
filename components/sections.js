// components/sections.js
import Hero from '../components/home/hero'
import FisioHome from '../components/home/fisio'

// Grid of sections for the first page (index)
export const SectionRenderer = ({ secao }) => {

  const { slug } = secao.fields
  switch (slug) {
    case 'hero':
      return <Hero secao={secao} />;
    case 'fisioterapia-home':
      return <FisioHome secao={secao} />;
    case 'pilates':
      return 'pilates';
    case 'central-de-atendimento':
      return 'central-de-atendimento';
    default:
      return 'nothing came from render'
  }

}

export default SectionRenderer