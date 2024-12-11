import { TvRetro, Person, Video, PencilToSquare } from '@gravity-ui/icons';

import { routeMap } from '@/ui/router/routeMap';

export const ICON = {
    icon: TvRetro,
    text: 'Filmoiskatel',
    iconSize: 24,
    textSize: 15,
    href: routeMap.feed,
};

export const MENU_ITEMS = [{
    id: '0',
    icon: Video,
    title: 'Фильмы',
    link: routeMap.films,
},
{
    id: '1',
    icon: PencilToSquare,
    title: 'Рецензии',
    link: routeMap.reviews,
},
{
    id: '2',
    icon: Person,
    title: 'Профиль',
    link: routeMap.profile,
}];
