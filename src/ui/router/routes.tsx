import { GuestGuard } from "../auth/GuestGuard";
import { FilmsPage } from "../pages/FilmsPage/FilmsPage";
import { MoviePage } from '../pages/MoviePage/MoviePage';
import { routeMap } from "./routeMap";

export const routes = [
    {
        path: routeMap.feed,
        element: <div>{'hello world'}</div>
    },
    {
        path: routeMap.reviews,
        element: <div>{'Отзывы'}</div>
    },
    {
        path: routeMap.films,
        element: <FilmsPage/>
    },
    {
        path: routeMap.movie,
        element: <MoviePage />,
    },
    {
        path: routeMap.notifications,
        element: <div>{'уведомления'}</div>
    },
    {
        path: routeMap.settings,
        element: <div>{'настройки'}</div>
    },
    {
        path: routeMap.profile,
        element: <GuestGuard><div>{'профиль'}</div></GuestGuard>
    },
]