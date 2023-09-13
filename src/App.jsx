import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';


import { LoginPage } from './pages/LoginPage/LoginPage';
import { EmailVerification } from './pages/PasswordRecover/EmailVerification';
import { MatrixVerification } from './pages/PasswordRecover/MatrixVerification';
import { NewPassword } from './pages/PasswordRecover/NewPassword';
import { MainMenu } from './pages/Menu/MainMenu';
import { DataMenu } from './pages/Menu/DataMenu';

import Nav from './molecules/Nav';
export function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          
          <Route exact path="/emailVerification" element={<EmailVerification />} />
          <Route exact path="/matrixVerification" element={<MatrixVerification />} />
          <Route exact path="/newPassword" element={<NewPassword />} />

          <Route path="" element={<Nav/>}>
            <Route exact path="/mainMenu" element={<MainMenu/>}/>
            <Route exact path="/dataMenu" element={<DataMenu/>}/>
          </Route>

        </Routes>
      </Router>
    </div>

  );
}

export default App;
