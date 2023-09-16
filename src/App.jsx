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
import { ClientMenu } from './pages/CRUDS/ClientMenu';
import { ClientForm } from './pages/CRUDS/ClientForm';
import { UserMenu } from './pages/CRUDS/UserMenu';
import { UserForm } from './pages/CRUDS/UserForm';
import { AccountMenu } from './pages/CRUDS/AccountMenu';
import { AccountForm } from './pages/CRUDS/AccountForm';
import { BankMenu } from './pages/CRUDS/BankMenu';
import { BankForm } from './pages/CRUDS/BankForm';

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

          <Route path="" element={<Nav />}>
            <Route exact path="/mainMenu" element={<MainMenu />} />
            <Route exact path="/dataMenu" element={<DataMenu />} />
            <Route exact path="/clientMenu" element={<ClientMenu />} />
            <Route exact path="/clientForm" element={<ClientForm />} />
            <Route exact path="/userMenu" element={<UserMenu />} />
            <Route exact path="/userForm" element={<UserForm />} />
            <Route exact path="/accountMenu" element={<AccountMenu />} />
            <Route exact path="/accountForm" element={<AccountForm />} />
            <Route exact path="/bankMenu" element={<BankMenu />} />
            <Route exact path="/bankForm" element={<BankForm />} />

          </Route>

        </Routes>
      </Router>
    </div>

  );
}

export default App;
