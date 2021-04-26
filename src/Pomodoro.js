import React, { useState } from 'react';
import { Button, HStack, VStack, Text } from '@chakra-ui/react';


const Pomodoro = () => {
    // const [{ breakTime, pomoTime }, setCount] = useTimer({ breakTime:5, pomoTime:25 });
    const [{ breakTime, pomoTime }, setTime] = useState({
        breakTime: 300,
        pomoTime: 1500,
    });
    const [{ playPause, session }, setToggle] = useState({ isPlaying: false, sessionType: 1 }); // session 1 = pomoclock , session 2 = breakclock
    //figure out timer| once pomoclock reaches zero, unmount and mount/call 

    const handleSessionStart = (isPlaying) => {
        if (isPlaying) {
            setInterval(() => {
                console.log("hello");

                setTime(state => ({
                    ...state, pomoTime: pomoTime - 1,
                }))
            }, 1000);
        } else { // if isPlaying is not true then stop tyimer 
            clearInterval(handleSessionStart)
        }
    }


    // when you get here i think you learn about handling mounts 
    //and dismounts, apply knowledge when pomotime is done dismount and mount breaktime yadda yadda
    const handleSessionType = (sessionType) => {

    }

    const minuteHandler = (time) => {
        return Math.floor(time / 60)
    }

    const secondsHandler = (time) => {
        if (time % 60 <= 9) {
            return ('0' + time % 60).slice(-2);
        } else {
            return time % 60
        }
    }

    const handleTime = (increaseOrDecrease, type) => {
        if (type === "break") {
            if (increaseOrDecrease === true) {
                setTime(state => ({
                    ...state,
                    breakTime: state.breakTime < 3600 ? state.breakTime + 60 : 3600,
                }))
            } else {
                setTime(state => ({
                    ...state,
                    breakTime: state.breakTime > 0 ? state.breakTime - 60 : 0,
                }))
            }
        } else if (type === "pomo") {
            if (increaseOrDecrease === true) {
                setTime(state => ({
                    ...state,
                    pomoTime: state.pomoTime < 3600 ? state.pomoTime + 60 : 3600,
                }))
            } else {
                setTime(state => ({
                    ...state,
                    pomoTime: state.pomoTime > 0 ? state.pomoTime - 60 : 0,
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
            <Text id="break-length">{minuteHandler(breakTime)}</Text>
                </Text>

                <Button id="break-decrement" onClick={() => { handleTime(false, "break") }}> Decrease </Button>
            </HStack>
            {/* INCREMENT SESSION LENGTH */}
            <HStack>
                <Button
                    id="session-increment" onClick={() => { handleTime(true, "pomo") }}> Increase </Button>
                <Text id="session-label">
                    Session Length
            <Text id="session-length">{minuteHandler(pomoTime)}</Text>
                </Text>

                <Button id="session-decrement" onClick={() => { handleTime(false, "pomo"); }} >Decrease </Button>
            </HStack>
            {/* TIMER DISPLAY  */}
            <VStack border="1px" borderRadius="10px">

                <Text id="timer-label"> Session~~{minuteHandler(pomoTime) + ":" + secondsHandler(pomoTime)}</Text>

                <Text id="time-left" placeholder="testingzzzzzzzz"></Text>
                {/*  SESSION MANIPULATION */}
                <HStack>
                    <Button id="start_stop" onClick={() => { handleSessionStart(true) }}>Start/Stop</Button>
                    <Button
                        id="reset"
                        onClick={() => { setTime(() => ({ pomoTime: 1500, breakTime: 300 })) }}> Reset </Button>
                </HStack>
            </VStack>
        </div>
    );
}



export default Pomodoro;
