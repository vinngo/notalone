import { Box, Typography, Button, Modal, ModalClose, ModalDialog} from "@mui/joy";
import { useNavigate } from "react-router";
import { useState } from "react";

const Landing = () => {
  const [modalOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setOpen(true);
  }

  const handleNavigate = (path) =>{
    navigate(path);
  };

  /*Button: on click displays modal with disclaimer plus rules, once the user acknowledges rules, they can move on to topic selection*/
  return (
    <Box>
      <Typography>NotAlone</Typography>
      <Typography>You're never alone. Let's connect.</Typography>
      <Button onClick={handleGetStarted}>Get Started</Button>

      <Modal open={modalOpen} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose/>
          <Typography>
            Disclaimer
          </Typography>
          <Button onClick = {() => handleNavigate('/topic-selection')}>
            Next
          </Button>
        </ModalDialog>
      </Modal>
    </Box>
  );
}

export default Landing;

