import PropTypes from "prop-types";
import { Box } from '@chakra-ui/react'

const BackgroundImage = ({ 
  bgImage, 
  bgPosition, 
  bgSize, 
  bgRepeat, 
  className,
  w,
  h,
  maxW,
  minW,
  maxH,
  minH,
  top,
  left,
  bottom,
  right,
  zIndex }) => {
  return (
    <Box
        zIndex="-50"
        w={w || '100%'}
        h={h || '100%'}
        z={zIndex}
        maxW={maxW}
        minW={minW}
        maxH={maxH}
        minH={minH}
        pos={["relative", '', "absolute"]} 
        top={top}
        left={left}
        bottom={bottom}
        right={right}
        whiteSpace="nowrap"
        bgImage={bgImage}
        bgPosition={bgPosition || 'center'}
        bgSize={bgSize || 'cover'}
        bgRepeat={bgRepeat || 'no-repeat'}
        className={className + `background--holder` || `background--holder` }  />
  )
}

BackgroundImage.propTypes = {
  bgPosition: PropTypes.string,
  bgRepeat: PropTypes.string,
  bgSize: PropTypes.string,
  bottom: PropTypes.any,
  className: PropTypes.any,
  h: PropTypes.string,
  image: PropTypes.any.isRequired,
  left: PropTypes.any,
  right: PropTypes.any,
  top: PropTypes.any,
  w: PropTypes.string
}

export default BackgroundImage