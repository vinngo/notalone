import {Box, Typography, Button, Select, Option} from '@mui/joy';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSocket } from '../SocketContext';
import { io } from 'socket.io-client';

/*
Upon clicking submit, sends a API request to the backend to start the matchmaking process?

*/

const TopicSelection = () => {
  const navigate = useNavigate();
  const [topic, changeTopic] = useState('');
  const {socket, setSocket} = useSocket();
  
  const handleSubmit = async () => {
    /*
    start connection to the signaling server here! then export the connection to loading screen -> call.
    close the connection at call.
    */

    const newSocket = io('http://localhost:5500');

    setSocket(newSocket);

    newSocket.on('connect', async () =>{

          /*
          POST REQUEST HERE
          send topic and user ID to /start-matchmaking upon socket connection
          */

      const response = await fetch('http://localhost:5500/start-matchmaking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': newSocket.id,
          'topic': topic,
        })
      },);

      const data = await response.json();
      console.log(data.reply);

      navigate('/loading');
    });

  }

  return(
    <Box>
      <Typography>
        Let's Get Started
      </Typography>
      <Typography>
        Select one topic to talk about with other users interested in the same topic!
      </Typography>
      <Select onChange={(e, newValue) => changeTopic(newValue)}>
        <Option value = "stress">
          Stress
        </Option>
        <Option value = "relationships">
          Relationships
        </Option>
        <Option value = "work">
          Work
        </Option>
        <Option value = "school">
          School
        </Option>
        <Option value = "other">
          Other
        </Option>
      </Select>
      <Button disabled = {!topic} onClick = {handleSubmit}>
        Next
      </Button>
    </Box>
  );

}

export default TopicSelection; 