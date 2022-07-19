import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import Footer from '../components/footer'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
        <Box display="flex" flexDirection="column">
          <Box flexGrow={1}>
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
