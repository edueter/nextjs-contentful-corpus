import dynamic from 'next/dynamic'

const Typewriter = ({ children, speed, eraseDelay, typingDelay }) => {

  const ReactTyping = dynamic(
    () => import('react-typing-effect'),
    { ssr: false }
  )

  return (
    <ReactTyping
      text={children}
      speed={speed||250} 
      eraseDelay={eraseDelay||1300} 
      typingDelay={typingDelay||500} 
      />
  )
}

export default Typewriter