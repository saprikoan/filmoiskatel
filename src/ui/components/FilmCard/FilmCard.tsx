import { FC, useMemo } from 'react';
import { Card, DropdownMenu, Link, Text } from '@gravity-ui/uikit';

import block from 'bem-cn-lite';

import { sdk } from '@/sdk';
import useAuth from '@/ui/auth/useAuth';

import './FilmCard.scss';


export type FilmCardProps = {
    id: number,
    ruTitle: string,
    enTitle: string,
    releaseYear: number,
    imdbRating: number,
    kpRating: number,
    imageURL: string,
    countries: string[],
    genres: string[],
    rang?: number,
};

const cn = block('film-card');

export const FilmCard: FC<FilmCardProps> = ({
    id,
    ruTitle,
    enTitle,
    imdbRating,
    kpRating,
    imageURL,
    countries,
    genres,
    rang,
}) => {
    const countriesString = countries.join(', ');
    const genresString = genres.join(', ');
    const { user } = useAuth();


    const filmActions = useMemo(() => ([
        [
            {
                text: user?.watched?.includes(String(id)) ? 'Не просмотрен' : 'Просмотрен',
                action: () => sdk.watched(String(id)),
                theme: user?.watched?.includes(String(id)) ? 'danger' : 'normal',
            },
            {
                text:  user?.estimations?.find((item) => item.movieId === String(id)) ? 'Удалить оценку' : 'Оценить',
                theme:  user?.estimations?.find((item) => item.movieId === String(id)) ? 'danger' : 'normal',
                action: () => console.log('assing'),
            },
        ],
        [
            {
                text:  user?.willWatch?.includes(String(id)) ? 'Не буду смотреть' : 'Буду смотреть',
                action: () => sdk.willWatch(String(id)),
                theme: user?.willWatch?.includes(String(id)) ? 'danger' : 'normal',
            }
        ],
    ]), [id]);

    return (
        <Card view={'filled'} theme={'normal'} className={cn()}>
            <div className={cn('left-content')}>
                <Text variant={'header-1'}>{rang}</Text>
                <img className={cn('image')} src={imageURL}/>
                <div className={cn('info')}>
                    <Link className={cn('title')} href={`/films/${id}#anchor`}>{ruTitle}</Link>
                    <Text>{enTitle}</Text>
                    <Text color={'secondary'}>{`${countriesString}`}</Text>
                    <Text>{`${genresString}`}</Text>
                </div>
            </div>
            <div className={cn('ratings')}>
                <Text variant='subheader-3'>{kpRating}</Text>
                <Text variant='subheader-1' color={'secondary'}>{imdbRating}</Text>
            </div>
            <div>
                { /* @ts-ignore */ }
                <DropdownMenu items={filmActions}/>
            </div>
        </Card>
    );
}
