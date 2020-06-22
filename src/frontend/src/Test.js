import React from 'react';
import { Box, Button } from "@chakra-ui/core";
import { useColorMode } from "@chakra-ui/core";


function Test() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  );
}


export default Test;
