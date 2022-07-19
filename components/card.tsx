import { Box, Heading, Text } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

interface CardProps {
    title: string,
    subtitle: string,
    onClick: MouseEventHandler<HTMLDivElement>
}

const Card = (props: CardProps) => (
    <Box style={{cursor:"pointer"}} onClick={props.onClick} borderRadius="1em" padding="1em" borderColor="gray.600" borderWidth="1px">
        <Heading size="md">{props.title}</Heading>
        <Text>{props.subtitle}</Text>
    </Box>
)

export default Card