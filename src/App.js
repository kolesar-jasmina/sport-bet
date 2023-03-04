import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Start from './views/Start';
import Layout from './components/Layout';

function App() {
  const user = { name: 'John Doe', avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg' };

  return (
    <Router>
      <Layout user={user}>
        <Routes>
          <Route exact path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
