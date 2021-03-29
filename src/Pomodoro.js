import React, { useState } from 'react';
import { Button, ButtonGroup, HStack, VStack, Text } from '@chakra-ui/react';



function Pomodoro() {
    // const [{ breakTime, pomoTime }, setCount] = useTimer({ breakTime:5, pomoTime:25 });
    const [{ breakTime, pomoTime }, setTime] = useState({
        breakTime: 5,
        pomoTime: 25,
    });


    return (
        <div>
            {/* INCREMENT BREAK LENGTH */}
            <HStack>
                <Button
                    id="break-increment"
                    onClick={() => {
                        setTime(state => ({
                            ...state,
                            breakTime: state.breakTime < 60 ? state.breakTime + 1 : 60,
                        }));
                    }}
                >
                    Increase
          </Button>
                <Text id="break-label">
                    Break Length
            <Text id="break-length">{breakTime}</Text>
                </Text>

                <Button id="break-decrement" onClick={() => {
                    setTime(state => ({// can also just put pomoTime:pomoTime + 1
                        ...state, breakTime: state.breakTime >= 1 ? state.breakTime - 1 : 0,
                    }));
                }} >Decrease</Button>
            </HStack>
            {/* INCREMENT SESSION LENGTH */}
            <HStack>
                <Button
                    id="session-increment"
                    onClick={() =>
                        setTime(state => ({
                            ...state, pomoTime: state.pomoTime < 60 ? state.pomoTime + 1 : 60,
                        }))
                    }
                >
                    Increase
          </Button>
                <Text id="session-label">
                    Session Length
            <Text id="session-length">{pomoTime}</Text>
                </Text>

                <Button id="session-decrement" onClick={() =>
                    setTime(state => ({
                        ...state, pomoTime: state.pomoTime >= 1 ? state.pomoTime - 1 : 0,

                    }))
                } >Decrease</Button>
            </HStack>

            <VStack border="1px" borderRadius="10px">
                <Text id="timer-label"> Session</Text>
                <Text id="time-left">mm:ss</Text>
                <HStack>
                    <Button id="start_stop">Start/Stop</Button>
                    <Button
                        id="reset"
                        onClick={() => {
                            setTime(state => ({
                                breakTime: (state.breakTime = 5),
                                pomoTime: (state.pomoTime = 25),
                            }));
                        }}
                    >
                        Reset
            </Button>
                </HStack>
            </VStack>
        </div>
    );
}

export default Pomodoro;
