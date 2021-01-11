import PropTypes from "prop-types";
import { usePrefersReducedMotion, Box, keyframes } from '@chakra-ui/react';
import { RibbonCategoria, RibbonCurve, RibbonTitulo } from './ribbons';
import { BlockWithExcerpt } from './blocos';
import { PostImage } from './Imagens';
import Link from 'next/link';

function PostDestaque({ post }) {
  console.log(post.fields.imagemDestaque)
  const { titulo, slug, excerpt, autor, categorias, imagemDestaque } = post.fields;

  // General config for home of blog
  const zIndex = {
    ribbonCurve: 10,
    postImage: 50,
    ribbonText: 90
  };
  const transition = {
    timer: '.25s cubic-bezier(0.65, 0.05, 0.36, 1)',
    delayed: '.45s .5s cubic-bezier(0.65, 0.05, 0.36, 1)',
  };
  const colors = {
    ribbon: 'white',
    ribbonAutor: 'primary.100',
    curve: 'primary.100',
    text: 'primary.400',
    categorias: {
      effect: 'secondary.500',
      hover: {
        effect: 'white'
      },
    },
    hover: {
      ribbon: 'primary.100',
      curve: 'primary.200',
      text: 'primary.700',
    }
  };

  const bounce = keyframes`
      from { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
      to { transform: translateY(0px); }
    `;

  const motion = usePrefersReducedMotion();
  const animation = motion
    ? ''
    : `${bounce} infinite 1s linear`;

  return (
    <Link href={slug}>
      <Box
        className="post--principal"
        h="auto"
        pos="relative"
        role="group"
        gridArea="principal">
        <PostImage
        transition={transition.timer}
        zIndex={zIndex.postImage}
        imagemDestaque={imagemDestaque} />
        <RibbonCategoria
          pos="absolute"
          zIndex={zIndex.ribbonText}
          top="1rem"
          left={-4}
          colors={colors}
          transition={transition.timer}
          categorias={categorias} />
        <RibbonCurve
          zIndex={zIndex.ribbonCurve}
          pos="absolute"
          top={`2.4rem`}
          colors={colors}
          transition={transition.timer}
          left={-4} />
        <RibbonTitulo
          pos="absolute"
          zIndex={zIndex.ribbonText}
          transition={transition}
          colors={colors}
          bottom="2.5rem"
          left={-4}>{titulo}</RibbonTitulo>
        <RibbonCurve
          zIndex={zIndex.ribbonCurve}
          colors={colors}
          pos="absolute"
          top={`2.4rem`}
          left={-4} />
        <BlockWithExcerpt
          animation={animation}
          excerpt={excerpt}
          autor={autor}
          colors={colors}
          transition={transition} />
      </Box>
    </Link>
  );
}


export { PostDestaque }
