// components/sections.js
import Hero from '../components/home/hero'
import FisioHome from '../components/home/fisio'
import Pilates from '../components/home/pilates'
import HomeBlog from '../components/home/homeBlog'

// Grid of sections for the first page (index)
export const SectionRenderer = ({ secao, posts }) => {

  const { slug } = secao.fields
  switch (slug) {
    case 'hero':
      return <Hero secao={secao} />;
    case 'fisioterapia-home':
      return <FisioHome secao={secao} />;
    case 'pilates':
      return <Pilates secao={secao} />;
    case 'home-blog':
      return <HomeBlog secao={secao} posts={posts} />;
    case 'central-de-atendimento':
      return 'central-de-atendimento';
    default:
      return 'nothing came from render'
  }

}

export default SectionRenderer