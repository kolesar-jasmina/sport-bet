import './App.css';
// TODO: check fonts. it says to add them to the entry file... is this the entry file?
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import StartScreen from './views/StartScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<StartScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
