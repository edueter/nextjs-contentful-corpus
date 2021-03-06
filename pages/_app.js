import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { FormspreeProvider } from '@formspree/react'
//import { createBreakpoints } from "@chakra-ui/theme-tools"

const theme = extendTheme({
  breakpoints: {
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1600px'
  },
  colors: {
    primary: {
      100: "#E6ECF0",
      200: "#BFD0D9",
      300: "#99B4C2",
      400: "#4D7C94",
      500: "#004466",
      600: "#003D5C",
      700: "#00293D",
      800: "#001F2E",
      900: "#00141F",
    },
    secondary: {
      100: "#FCF5E9",
      200: "#F9E7C8",
      300: "#F5D8A7",
      400: "#EDBA65",
      500: "#E59D23",
      600: "#CE8D20",
      700: "#895E15",
      800: "#674710",
      900: "#452F0B",
    },
    terciary: {
      100: '#FEFEFD',
      200: '#FCFCF9',
      300: '#F9F9F5',
      400: '#F5F5EE',
      500: '#F1F1E6',
      600: '#D9D9CF',
      700: '#91918A',
      800: '#6C6C68',
      900: '#484845',
    },
    babyBlue: {
      100: '#F6FAFF',
      200: '#E8F3FE',
      300: '#DAECFD',
      400: '#BFDEFC',
      500: '#A3D0FA',
      600: '#93BBE1',
      700: '#627D96',
      800: '#495E71',
      900: '#313E4B',
    },
    grayBlue: {
      100: '#EFF3F7',
      200: '#D7E2EC',
      300: '#BED1E0',
      400: '#8EAEC9',
      500: '#5D8BB2',
      600: '#547DA0',
      700: '#38536B',
      800: '#2A3F50',
      900: '#1C2A35',
    },
    whatsapp: {
      tealgreen: {
        1: '#128C7E',
        2: '#075E54',
      },
      lightgreen: {
        1: '#25D366',
        2: '#179848',
      },
      beige: {
        1: '#ECE5DD',
        2: '#f0f0f0',
      },
      blue: '#34B7F1',
    },
  },
  fonts: {
    display: "Rubik, sans-serif",
    body: "Open Sans, sans-serif"
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: 'display',
        fontWeight: '400',
        color: 'primary.500',
        letterSpacing: 'tight'
      }
    },
    Button: {
      baseStyle: {
        fontFamily: 'display',
        fontWeight: '300',
        letterSpacing: 'wider',
        borderRadius: 'sm',
        py: 4,
        px: 6,
      }
    },
    Input: {
      baseStyle: {
        fontFamily: 'display',
        borderColor: 'primary.500',
        variant: 'flushed',
        color: 'primary.500'
      },
      variants: {
        flushed: {
          field: {
            borderColor: 'primary.500',
            pl: 1
          }
        }
      },
      defaultProps: {
        size: 'md',
        variant: 'flushed',
      },
    },
    Textarea: {
      baseStyle: {
        fontFamily: 'display',
        color: 'primary.500',
        borderColor: 'primary.500',
        _placeholder: {
          color: 'primary.500'
        }
      },
      variants: {
        flushed: {
          field: {
            borderColor: 'primary.500',
          },
        }
      },
      defaultProps: {
        size: 'md',
        variant: 'flushed',
      },
    },
    Select: {
      baseStyle: {
        fontFamily: 'display',
        color: 'primary.500',
        borderColor: 'primary.500',
        variant: 'flushed',
        _placeholder: {
          color: 'primary.500'
        },
      },
      variants: {
        flushed: {
          field: {
            borderColor: 'primary.500',
            pl: 1,
            color: 'primary.500',
          },

        }
      },
      defaultProps: {
        size: 'md',
        variant: 'flushed',
      },
    }
  },
  styles: {

    global: {
      'html': {
        fontSize: "18px",
        //color: "gray.600",
        //lineHeight: "tall",
      },

      //a: {
      //  color: "teal.500",
      //},
    }
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <FormspreeProvider project={process.env.NEXT_PUBLIC_FORMSPREE_PROJECT_ID}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </FormspreeProvider>
  )
}

export default MyApp
