import { AspectRatio } from '@chakra-ui/react'
import Image from 'next/image'

function PostImage({ imagemDestaque, zIndex, transition }) {
  const { acessibilidade, arquivo } = imagemDestaque.fields
  const { url } = arquivo.fields.file

  const imgPath = 'https:' + url

  return (
    <AspectRatio
      top="0"
      left="0"
      bottom="0"
      right="0"
      zIndex={zIndex}
      transition={`all ${transition}`}
      _grouphover={{
        filter: 'grayscale(.2)',
        transform: 'scale(1.01)'
      }}
      ratio={16 / 9}
      w="100%">
      <Image src={imgPath} layout="fill" objectFit="cover" alt={acessibilidade} />
    </AspectRatio>
  )
}


export { PostImage }