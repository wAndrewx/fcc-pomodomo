import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import ReactFCCtest from 'react-fcctest';
import Pomodoro from "./Pomodoro.js";

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <ReactFCCtest/> */}
      <Pomodoro/>
    </ChakraProvider>
  );
}

export default App;
