import { useState } from 'react'
import {ThemeProvider} from '@gravity-ui/uikit';
import { AsideHeader } from '@gravity-ui/navigation';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import './App.scss'

function App() {
  const [compact, setCompact] = useState(false);

  return (
    <ThemeProvider theme='dark'>
      <AsideHeader compact={compact} onChangeCompact={setCompact}/>
    </ThemeProvider>
  )
}
export default App;
