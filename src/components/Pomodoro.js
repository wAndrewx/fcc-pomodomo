import React, { useState, useEffect } from 'react';
import { VStack } from '@chakra-ui/react';
import { BreakInterval } from './pomoUtils/BreakInterval'
import { SessionSetters } from './pomoUtils/SessionSetters'
import { SessionInterval } from './pomoUtils/SessionInterval'
import { TimerDisplay } from './pomoUtils/TimerDisplay'


const Pomodoro = () => {
    const [{ breakTime, pomoTime }, setTime] = useState({
        breakTime: 300,
        pomoTime: 1500,
    });
    const [{ isPlaying }, setPlaying] = useState(false);
    const [sessionType, setSession] = useState(true);// session true = pomoclock , session false = breakclock
    const [timerPointer, setPointer] = useState(pomoTime)

    console.log(timerPointer)
    useEffect(() => {
        let timer = null;
        let extra = null

        if (isPlaying && timerPointer) {
            timer = setInterval(() => {
                setPointer((time = 1) => time - 1)

            }, 1000);
        } else if (!timerPointer) {
            extra = setInterval(() => {
                setSession(!sessionType);
                handleSwitch(!sessionType);
            }, 1000);
            clearInterval(timer)
        }
        return () => {
            clearInterval(timer)
            clearInterval(extra)
        }
    }, [isPlaying, setPlaying, timerPointer, setSession, sessionType, setPointer])

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

    const handleSwitch = (session) => {
        if (session) {
            setPointer(pomoTime)
        } else {
            setPointer(breakTime)
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
        if (!isPlaying) { // only if its not playing
            if (incOrDec === true) {
                setTime(state => ({
                    ...state,
                    pomoTime: state.pomoTime < 3600 ? state.pomoTime + 60 : 3600,
                }))
                setPointer(pomoTime < 3600 ? pomoTime + 60 : 3600)

            } else {
                setTime(state => ({
                    ...state,
                    pomoTime: state.pomoTime > 60 ? state.pomoTime - 60 : 60,
                }))
                setPointer(pomoTime > 60 ? pomoTime - 60 : 60)
            }

        }
    }

    const handleBreakTime = (increaseOrDecrease) => {

        if (!isPlaying) {
            if (increaseOrDecrease === true) {
                setTime(state => ({
                    ...state,
                    breakTime: state.breakTime < 3600 ? state.breakTime + 60 : 3600,
                }))
            } else {
                setTime(state => ({
                    ...state,
                    breakTime: state.breakTime > 60 ? state.breakTime - 60 : 60,
                }))
            }
        }

    }

    const handleReset = () => {
        setTime(() => ({ pomoTime: 1500, breakTime: 300 }))
        setPlaying(() => ({ isPlaying: false }))
        setSession(true);
        setPointer(1500)

    }


    return (
        <div>
            {/* INCREMENT BREAK LENGTH */}
            <BreakInterval sessionMinute={minuteHandler(breakTime)} breakStateTime={handleBreakTime} />
            {/* INCREMENT SESSION LENGTH */}
            <SessionInterval sessionMinute={minuteHandler(pomoTime)} sessionStateTime={handleSessionTime} />
            {/* TIMER DISPLAY  */}
            <VStack border="1px" borderRadius="10px">
                {sessionType && <TimerDisplay sessionType={"Session"} minuteHandle={minuteHandler(timerPointer)} secondsHandle={secondsHandler(timerPointer)} />}
                {!sessionType && <TimerDisplay sessionType={"Break"} minuteHandle={minuteHandler(timerPointer)} secondsHandle={secondsHandler(timerPointer)} />}

                {/* SESSION MANIPULATION 
                 MAKE SURE YOU ALSO ADD IN HANDLESESSIONSECOND */}
                <SessionSetters handlePlay={handlePlayBool} resetTime={handleReset} />
            </VStack>
        </div>
    );
}



export default Pomodoro;
