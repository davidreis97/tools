import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools";
import '@fontsource/varela-round';
import type { AppProps } from 'next/app';
import Footer from '../components/footer';
import '../styles/globals.css';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  colors: {
    bronze: {
      50: '#fff0e1',
      100: '#f3d8bc',
      200: '#e8bf96',
      300: '#dda56f',
      400: '#d28c47',
      500: '#b9722d',
      600: '#915922',
      700: '#684017',
      800: '#402509',
      900: '#1b0b00',
    },
    vgreen: {
      50: '#ebf9f9',
      100: '#c4eded',
      200: '#9de2e2',
      300: '#76d6d6',
      400: '#4ecaca',
      500: '#35b1b1',
      600: '#298989',
      700: '#1d6262',
      800: '#123b3b',
      900: '#061414',
      999: '#278282'
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("gray.300", "#171F2B")(props),
      }
    })
  },
  fonts: {
    heading: 'Varela Round, Helvetica, sans-serif',
    body: 'Varela Round, Helvetica, sans-serif',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
        <Box display="flex" flexDirection="column">
          <Box flexGrow={1} display="flex" justifyContent="center" >
            <Component {...pageProps} />
          </Box>
          <Box>
            <Footer/>
          </Box>
        </Box>
    </ChakraProvider>
  )
}

export default MyApp
