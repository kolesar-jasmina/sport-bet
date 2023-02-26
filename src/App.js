import './App.css';
// TODO: check fonts. it says to add them to the entry file... is this the entry file?
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './views/HomeScreen'
import Login from './views/LoginScreen'

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomeScreen} />
      <Route path="/login" component={Login} />
      {/* <Route path="/contact" component={Contact} /> */}
    </Router>
  );
}

export default App;
