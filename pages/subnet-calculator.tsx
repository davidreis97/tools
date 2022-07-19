import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Divider, Heading, Input, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Footer from '../components/footer'
import { getSmallestSubnet } from '../logic/subnet-calculator'

const textAreaPlaceholder = `192.168.1.1
192.168.1.2
...
`;

const SubnetCalculator: NextPage = () => {
    var [ips, setIps] = useState<string[]>([]);

    var subnet = getSmallestSubnet(ips);

    return (
        <Center height="100%" justifyContent="center" display="flex" flexDir="column">
            <Head>
                <title>David&apos;s Tools</title>
                <meta name="description" content="Calculate smallest subnet from a set of IPv4 addresses." />
            </Head>

            <Box>
                <Box marginBottom="2em">
                    <Heading>Subnet Calculator</Heading>
                    <Text>Calculate the smallest subnet that fits a set of IPv4 addresses.</Text>
                    <Text color="gray.400">Found an issue? Please report it TODO.</Text>
                </Box>
                <Stack spacing='24px' direction="row">
                    <Box display="flex" flexDirection="column" width="300px" padding="1em" borderRadius="xl" borderWidth="thin" borderColor="gray.600">
                        <Text paddingBottom="1em" fontFamily="heading" color="gray.400" letterSpacing="wider" fontSize="xs" fontWeight="bold">INPUT</Text>
                        <Textarea placeholder={textAreaPlaceholder} resize="none" height="100%" onInput={evt => setIps(evt.currentTarget.value.split(/\r?\n/))} />
                    </Box>
                    <Box display="flex" flexDirection="column" width="460px" padding="1em" borderRadius="xl" borderWidth="thin" borderColor="gray.600">
                        <Text paddingBottom="1em" fontFamily="heading" color="gray.400" letterSpacing="wider" fontSize="xs" fontWeight="bold">OUTPUT</Text>
                        {/* The following piece of code is the reason why I'm not a frontend dev */}
                        <TableContainer>
                            <Table variant='simple'>
                                <Tbody>
                                    <Tr>
                                        <Td>Subnet</Td>
                                        <Td>{subnet.baseAddress}/{subnet.maskBits}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Netmask</Td>
                                        <Td>{subnet.netMask} ({subnet.maskBits} bits)</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Wildcard</Td>
                                        <Td>{subnet.wildCard} ({subnet.wildCardBits} bits)</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Base Address</Td>
                                        <Td>{subnet.baseAddress}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Broadcast</Td>
                                        <Td>{subnet.broadcast}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Min Host</Td>
                                        <Td>{subnet.hostMin}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Max Host</Td>
                                        <Td>{subnet.hostMax}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Host Count</Td>
                                        <Td>{subnet.hostCount}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Stack>
            </Box>
        </Center>
    )
}

export default SubnetCalculator