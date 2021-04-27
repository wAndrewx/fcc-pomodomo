import { Button, HStack } from "@chakra-ui/react";


export const SessionSet = (props) => {

    return (
        <div>
            <HStack>
                <Button id="start_stop">Start/Stop</Button>
                <Button
                    id="reset" onClick={props.resetTime}> Reset </Button>
            </HStack>
        </div>

    )
}
