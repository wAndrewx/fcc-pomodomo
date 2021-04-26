import { chakra, Button, HStack, Text } from "@chakra-ui/react";

//handling time function in parent
export const SessionButtons = (props) => {
    const sessionStateTime = (incOrDec) => {
        props.sessionStateTime(incOrDec);
    }

    return (<div>
        <HStack>
            <Button
                id="session-increment" onClick={() => { sessionStateTime(true) }}> Increase </Button>
            <Text id="session-label">
                Session Length
            <Text id="session-length">{props.sessionMinute}</Text>
            </Text>

            <Button id="session-decrement" onClick={() => { props.sessionStateTime(false); }} >Decrease </Button>
        </HStack>
    </div>)
}



