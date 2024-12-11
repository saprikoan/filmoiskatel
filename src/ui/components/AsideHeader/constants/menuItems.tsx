import { TvRetro, Video, ArrowRightToSquare } from '@gravity-ui/icons';

import { routeMap } from '@/ui/router/routeMap';

export const ICON = {
    icon: TvRetro,
    text: 'Filmoiskatel',
    iconSize: 24,
    textSize: 15,
    href: routeMap.films,
};

export const MENU_ITEMS = [{
    id: '0',
    icon: Video,
    title: 'Фильмы',
    link: routeMap.films,
},
{
    id: '2',
    icon: ArrowRightToSquare,
    title: 'Выйти',
    link: routeMap.films,
    onItemClick: () => {
        window.localStorage.removeItem('token');
        window.location.reload();
    }
}];
