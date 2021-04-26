import { Button, HStack, Text } from "@chakra-ui/react";


export const BreakButtons = (props) => {

    const handleTime = (increaseOrDecrease) => {

        if (increaseOrDecrease === true) {
            props.breakStateTime++;
        } else {
            props.breakStateTime--;
        }
    }
    return (
        <div>
            <HStack>
                <Button
                    id="break-increment" onClick={() => { handleTime(true) }}> Increase </Button>
                <Text id="break-label">
                    Break Length
            <Text id="break-length">{props.sessionMinute}</Text>
                </Text>

                <Button id="break-decrement" onClick={() => { handleTime(false) }}> Decrease </Button>
            </HStack>
        </div>
    )

}