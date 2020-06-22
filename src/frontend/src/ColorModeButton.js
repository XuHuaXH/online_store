import React from 'react';
import { Box, Button, useColorMode } from "@chakra-ui/core";

function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "red.500", dark: "red.200" };
  const color = { light: "white", dark: "gray.800" };
  return (
      <Button
        style={{float: 'right'}}
        onClick={toggleColorMode}
        >
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
  );
}


export default ColorModeButton;
