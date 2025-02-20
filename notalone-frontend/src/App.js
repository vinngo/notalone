import './App.css';
import Landing from './pages/Landing';
import LoadingScreen from './pages/LoadingScreen';
import TopicSelection from './pages/TopicSelection';
import Call from './pages/Call';
import {BrowserRouter, Routes, Route} from 'react-router';
import { SocketProvider } from './SocketContext';

function App() {

  /* Layout: 

    React Router
      Landing: Introduction with pop up that directs to the topic selection screen
      Topic Selection: Dropdown menu with different topics to talk about. Next button directs to matchmaking screen and starts backend processes
      Matchmaking Screen: Simple loading screen with animation while the backend figures out the connection
      Active Call Screen: Elements such as webcam, audio, call controls such as end call, mute, etc. End call directs to topic screen 
      with notifcation for call ended and thanks user.
    End React Router
    
  */
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/topic-selection" element = {<TopicSelection/>}/>
          <Route path="/loading" element = {<LoadingScreen/>}/>
          <Route path="/call" element = {<Call/>}/>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
