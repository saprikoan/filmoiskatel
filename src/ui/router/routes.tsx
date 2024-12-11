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
        element: <GuestGuard><FilmsPage/></GuestGuard>
    },
    {
        path: routeMap.movie,
        element: <GuestGuard><MoviePage /></GuestGuard>,
    },
]