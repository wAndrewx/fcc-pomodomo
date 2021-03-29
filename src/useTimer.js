import { useState } from "react"

export const useTimer = (initTime) => {
    const [timer, setTimer] = useState(initTime);

    return [timer,
        e => { setTimer(...timer, timer + 1) }]
}