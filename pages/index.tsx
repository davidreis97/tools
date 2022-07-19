import { Box, Center, Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Card from '../components/card'

const Home: NextPage = () => {
  var router = useRouter();

  return (
    <Center height="100%" display="flex" flexDir="column">
      <Head>
        <title>David&apos;s Tools</title>
        <meta name="description" content="Collection of useful tools for software development." />
      </Head>

      <Box>
        <Box marginBottom="2em" alignSelf="start">
          <Heading>David&apos;s Tools</Heading>
          <Text>Collection of useful tools for software development.</Text>
        </Box>
        <Card 
          title='Subnet Calculator' 
          subtitle='Calculate the smallest subnet that fits a set of IPv4 addresses.' 
          onClick={() => router.push("/subnet-calculator")} />
      </Box>
    </Center>
  )
}

export default Home
