import { Box, Center, Container, Divider, Link, Stack, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/footer'

const Home: NextPage = () => {
  return (
    <Box display="flex" flexDir="column">
      <Head>
        <title>David&apos;s Tools</title>
        <meta name="description" content="Index of programming and network tools" />
      </Head>

      <Box flexGrow={1}>
        <Container>
          <Stack>

          </Stack>
        </Container>
      </Box>

      <Footer/>
    </Box>
  )
}

export default Home
