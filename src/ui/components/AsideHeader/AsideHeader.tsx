import { useEffect, useState } from 'react';
import { AsideHeader as Header } from '@gravity-ui/navigation';

import { ICON } from './constants/constants.tsx';
import { MENU_ITEMS } from './constants/constants.tsx';

export const AsideHeader = () => {
    const initialCompact = localStorage.getItem('asideHeaderCompact') == 'true';
    const [compact, setCompact] = useState(initialCompact);

    useEffect(() => {
        localStorage.setItem('asideHeaderCompact', String(compact))
    }, [compact])

    return(
        <Header 
            compact={compact} onChangeCompact={setCompact} 
            headerDecoration={true}
            logo={ICON}
            menuItems={MENU_ITEMS}
        />
    );
};
