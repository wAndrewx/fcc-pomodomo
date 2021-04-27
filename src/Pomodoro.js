import React, { useState } from 'react';
import { VStack, Text } from '@chakra-ui/react';
import { BreakButtons } from './components/BreakInterval'
import { SessionSet } from './components/SessionSetters'
import { SessionButtons } from './components/SessionInterval'
import { SessionShow } from './components/SessionDisplay'


const Pomodoro = () => {
    // const [{ breakTime, pomoTime }, setCount] = useTimer({ breakTime:5, pomoTime:25 });
    const [{ breakTime, pomoTime }, setTime] = useState({
        breakTime: 300,
        pomoTime: 1500,
    });
    const [{ playPause, session }, setToggle] = useState({ isPlaying: false, sessionType: 1 }); // session 1 = pomoclock , session 2 = breakclock
    //figure out timer| once pomoclock reaches zero, unmount and mount/call 

    // const handleSessionStart = (isPlaying) => {
    //     // if (isPlaying) {
    //     //     setInterval(() => {
    //     //         console.log("hello");

    //     //         setTime(state => ({
    //     //             ...state, pomoTime: pomoTime - 1,
    //     //         }))
    //     //     }, 1000);
    //     // } else { // if isPlaying is not true then stop tyimer 
    //     //     clearInterval(handleSessionStart)
    //     // }
    // }


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

    const handleSessionTime = (incOrDec) => {
        if (incOrDec === true) {
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

    const handleBreakTime = (increaseOrDecrease) => {

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

    }

    const handleReset = () => {
        setTime(() => ({ pomoTime: 1500, breakTime: 300 }))
    }

    return (
        <div>
            {/* INCREMENT BREAK LENGTH */}
            <BreakButtons sessionMinute={minuteHandler(breakTime)} breakStateTime={handleBreakTime} />
            {/* INCREMENT SESSION LENGTH */}
            <SessionButtons sessionMinute={minuteHandler(pomoTime)} sessionStateTime={handleSessionTime} />
            {/* TIMER DISPLAY  */}
            <VStack border="1px" borderRadius="10px">

                <SessionShow minuteHandle={minuteHandler(pomoTime)} secondsHandle={secondsHandler(pomoTime)} />
                {/* <SessionShow minuteHandle={minuteHandler(pomoTime)} secondsHandle={secondsHandler()} /> */}
                {/* SESSION MANIPULATION 
                 MAKE SURE YOU ALSO ADD IN HANDLESESSIONSECOND */}
                <SessionSet resetTime={handleReset} />
            </VStack>
        </div>
    );
}



export default Pomodoro;
