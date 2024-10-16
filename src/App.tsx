import {ThemeProvider} from '@gravity-ui/uikit';
import { AsideHeader } from './ui/components/AsideHeader/AsideHeader.tsx';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import './App.scss'

function App() {
  return (
    <ThemeProvider theme='dark'>
      <AsideHeader/>
    </ThemeProvider>
  )
}
export default App;
