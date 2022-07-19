import { Github } from '@chakra-icons/bootstrap'
import { QuestionIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Checkbox, Heading, Link, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Table, TableContainer, Tbody, Td, Text, Textarea, Tooltip, Tr } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { getSmallestSubnet } from '../logic/subnet-calculator'

const textAreaPlaceholder = `192.168.1.1
192.168.1.2
...
`;

interface SubnetCalculatorState {
    ips: string[]
    mustBeUsableAddresses: boolean,
    maxMaskSize: number,
}

const SubnetCalculator: NextPage = () => {
    var [state, setState] = useState<SubnetCalculatorState>({
        ips: [],
        mustBeUsableAddresses: true,
        maxMaskSize: 30
    });

    var subnet = getSmallestSubnet(state.ips, state.mustBeUsableAddresses, state.maxMaskSize);

    return (
        <Box width="auto" margin="auto" maxWidth="57em" display="flex" justifyContent="center" flexDir="column">
            <Head>
                <title>David&apos;s Tools | Subnet Calculator</title>
                <meta name="description" content="Calculate smallest subnet from a set of IPv4 addresses." />
            </Head>

            <Box marginBottom="2em">
                <Box flexWrap="wrap" display="flex" justifyContent="space-between">
                    <Heading>Subnet Calculator</Heading>
                    <Button onClick={() => window.open("https://www.github.com/davidreis97/tools", '_blank')?.focus()} colorScheme="gray" leftIcon={<Github />}>Source Code</Button>
                </Box>
                <Text wordBreak="break-word">Calculate the smallest subnet that fits a set of IPv4 addresses.</Text>
                <Box display="flex">
                    <Text color="gray.400">Found an issue? Please report it&nbsp;</Text>
                    <Link color="gray.400" isExternal textDecorationStyle="dashed" textDecorationThickness="1px" textDecorationLine="underline" href="https://www.github.com/davidreis97/tools/issues">
                        here
                    </Link>
                    <Text color="gray.400">.</Text>
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" flexWrap="wrap" direction="row">
                <Box margin="0.5em" display="flex" flexDirection="column" padding="1em" borderRadius="xl" borderWidth="thin" borderColor="gray.600">
                    <Text marginBottom="1em" fontFamily="heading" color="gray.400" letterSpacing="wider" fontSize="xs" fontWeight="bold">INPUT</Text>
                    <Textarea placeholder={textAreaPlaceholder} resize="none" height="100%"
                        onInput={evt => setState((state) => ({ ...state, ips: (evt.target as HTMLTextAreaElement).value.split(/\r?\n/) }))} />
                    <Text marginTop="1em" marginBottom="0.5em" fontFamily="heading" color="gray.400" letterSpacing="wider" fontSize="xs" fontWeight="bold">SETTINGS</Text>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Text>Maximum netmask size</Text>
                        <Tooltip label="Maximum number of bits that the netmask can have."><QuestionIcon marginLeft="1em"/></Tooltip>
                    </Box>
                    <NumberInput onChange={(_, maxMaskSize) => setState((s) => ({ ...s, maxMaskSize }))} min={0} max={32} value={state.maxMaskSize} size="sm">
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="0.5em">
                        <Checkbox
                            defaultChecked
                            onChange={() => setState((s) => ({ ...s, mustBeUsableAddresses: !state.mustBeUsableAddresses }))}>
                            Avoid broadcast and base address
                        </Checkbox>
                        <Tooltip label="If set, the addresses provided as input will be within the Min Host and Max Host ip range."><QuestionIcon marginLeft="1em"/></Tooltip>
                    </Box>
                </Box>
                {/* The following lines of code are the reason why I'm not a frontend dev */}
                <Box width="27em" margin="0.5em" display="flex" flexDirection="column" padding="1em" borderRadius="xl" borderWidth="thin" borderColor="gray.600">
                    <Text paddingBottom="1em" fontFamily="heading" color="gray.400" letterSpacing="wider" fontSize="xs" fontWeight="bold">OUTPUT</Text>
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
            </Box>
        </Box>
    )
}

export default SubnetCalculator