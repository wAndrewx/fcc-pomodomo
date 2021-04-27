import React, { useState, useEffect, useRef } from 'react';
import { VStack, Text } from '@chakra-ui/react';
import { BreakButtons } from './components/BreakInterval'
import { SessionSet } from './components/SessionSetters'
import { SessionButtons } from './components/SessionInterval'
import { SessionShow } from './components/TimerDisplay'


const Pomodoro = () => {
    // const [{ breakTime, pomoTime }, setCount] = useTimer({ breakTime:5, pomoTime:25 });
    const [{ breakTime, pomoTime }, setTime] = useState({
        breakTime: 300,
        pomoTime: 1500,
    });
    const [{ isPlaying }, setPlaying] = useState(false);
    const [sessionType, setSession] = useState(1);// session 1 = pomoclock , session 2 = breakclock
    //figure out timer| once pomoclock reaches zero, unmount and mount/call 
    const pointerTime = useRef(1500)


    useEffect(() => {
        //when session is changed render other timer
        let timer = null;
        if (isPlaying && pomoTime > 0) {
            timer = setInterval(() => {
                console.log("test")
                setTime((state) => ({
                    ...state, pomoTime: pomoTime - 1
                }))
            }, 1000);
        } else {
            clearInterval(timer)
            console.log("inside else block")
        }

        return () => {
            clearInterval(timer)
            console.log("cleaned")
        }
    }, [isPlaying, setPlaying])

    const handlePlayBool = () => {
        if (isPlaying) {
            setPlaying(() => ({
                isPlaying: false
            }))
        } else {
            setPlaying(() => ({
                isPlaying: true
            }))
        }
    }
    const switchSession = () => {
        if (pomoTime === 0) {
            setSession(() => ({
                sessionType: 2 // break
            }))
            pointerTime.current = breakTime
            console.log(pointerTime.current)
        } else if (breakTime === 0) {
            setSession(() => ({
                sessionType: 1 //pomo
            }))
            pointerTime.current = pomoTime
            console.log(pointerTime.current)
        }
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

                {sessionType === 1 && <SessionShow sessionType={"Session|"} minuteHandle={minuteHandler(pomoTime)} secondsHandle={secondsHandler(pomoTime)} />}
                {sessionType === 2 && <SessionShow sessionType={"Break|"} minuteHandle={minuteHandler(breakTime)} secondsHandle={secondsHandler(breakTime)} />}

                {/* SESSION MANIPULATION 
                 MAKE SURE YOU ALSO ADD IN HANDLESESSIONSECOND */}
                <SessionSet handlePlay={handlePlayBool} resetTime={handleReset} />
            </VStack>
        </div>
    );
}



export default Pomodoro;
