import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import { LoginPage } from './pages/LoginPage/LoginPage';
export function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
