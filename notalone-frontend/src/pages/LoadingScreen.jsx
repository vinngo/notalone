import {Box, Typography, CircularProgress} from '@mui/joy';
import {useNavigate} from 'react-router';
import { useEffect, createContext} from 'react';
import { useSocket } from '../SocketContext';

const LoadingScreen = () => {

  const navigate = useNavigate();
  const {socket} = useSocket();

  useEffect(() => {
    /* 
      use websocket, when socket gets 'match-found', navigate to the call room.
    */
    if (!socket){
      console.error('Socket connection not found!');
    }

    console.log(socket.id);

    socket.on('match-found', (data) => {
      console.log('Match found with peer:', data.peerId);
      console.log('Role:', data.role);
      navigate('/call', {state : {pid: data.peerId, role: data.role}});
    });
  })


  return(
    <Box>
      <Typography>Matchmaking...Please sit tight!</Typography>
      <CircularProgress></CircularProgress>
    </Box>
  );
}

export default LoadingScreen;