import { ThemeProvider } from '@gravity-ui/uikit';

import { AsideHeader } from './ui/components/AsideHeader/AsideHeader.tsx';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import './App.scss'
import AuthContext, { AuthProvider } from './ui/auth/AuthContext.tsx';


function App() {
  return (
    <ThemeProvider theme='dark'>
      <AuthProvider>
        <AsideHeader/>
      </AuthProvider>
    </ThemeProvider>
  )
}
export default App;
