import React, { useState } from 'react';
import { Button, HStack, VStack, Text } from '@chakra-ui/react';
import moment from 'moment';


const Pomodoro = () => {
    // const [{ breakTime, pomoTime }, setCount] = useTimer({ breakTime:5, pomoTime:25 });
    const [{ breakTime, pomoTime }, setTime] = useState({
        breakTime: 5,
        pomoTime: 25,
    });
    // const [{ playPause, session }, setToggle] = useState({ playPause: false, session: 1 }); // session 1 = pomoclock , session 2 = breakclock
    //figure out timer| once pomoclock reaches zero, unmount and mount/call 
    let minute = moment.duration(pomoTime, 'minute').minutes();
    let seconds = moment.duration(pomoTime, 'second').minutes();
    console.log(minute)
    const handleTime = (increaseOrDecrease, type) => {
        if (type === "break") {
            if (increaseOrDecrease === true) {
                setTime(state => ({
                    ...state,
                    breakTime: state.breakTime < 60 ? state.breakTime + 1 : 60,
                }))
            } else {
                setTime(state => ({
                    ...state,
                    breakTime: state.breakTime > 0 ? state.breakTime - 1 : 0,
                }))
            }
        } else if (type === "pomo") {
            if (increaseOrDecrease === true) {
                setTime(state => ({
                    ...state,
                    pomoTime: state.pomoTime < 60 ? state.pomoTime + 1 : 60,
                }))
            } else {
                setTime(state => ({
                    ...state,
                    pomoTime: state.pomoTime >0 ? state.pomoTime - 1 : 0,
                }))
            }
        }
    }

    return (
        <div>
            {/* INCREMENT BREAK LENGTH */}
            <HStack>
                <Button
                    id="break-increment" onClick={() => { handleTime(true, "break") }}> Increase </Button>
                <Text id="break-label">
                    Break Length
            <Text id="break-length">{breakTime}</Text>
                </Text>

                <Button id="break-decrement" onClick={() => { handleTime(false, "break") }}> Decrease </Button>
            </HStack>
            {/* INCREMENT SESSION LENGTH */}
            <HStack>
                <Button
                    id="session-increment" onClick={() => { handleTime(true, "pomo") }}> Increase </Button>
                <Text id="session-label">
                    Session Length
            <Text id="session-length">{pomoTime}</Text>
                </Text>

                <Button id="session-decrement" onClick={() => { handleTime(false, "pomo") }} >Decrease </Button>
            </HStack>
            {/*  */}
            <VStack border="1px" borderRadius="10px">

                <Text id="timer-label"> Session:{minute} / {seconds}</Text>

                <Text id="time-left" placeholder="testingzzzzzzzz"></Text>

                <HStack>
                    <Button id="start_stop">Start/Stop</Button>
                    <Button
                        id="reset"
                        onClick={() => { setTime(() => ({ pomoTime: 25, breakTime: 5 })) }}> Reset </Button>
                </HStack>
            </VStack>
        </div>
    );
}



export default Pomodoro;
