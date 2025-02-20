import React from "react";
import { Box, Button, Typography } from "@mui/joy";

const CallUI = ({ children }) => {
  return (
    <Box>
      <Typography>TALK</Typography>
      {children}
      <Button>END CALL</Button>
    </Box>
  );
};

export default CallUI;
