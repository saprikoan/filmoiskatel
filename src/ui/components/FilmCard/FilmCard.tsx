import { FC } from 'react';
import { Card, DropdownMenu, Link, Text } from '@gravity-ui/uikit';

import block from 'bem-cn-lite';

import { filmActions } from './constants/filmActions';
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
    releaseYear,
    imdbRating,
    kpRating,
    imageURL,
    countries,
    genres,
    rang,
}) => {
    const countriesString = countries.join(', ');
    const genresString = genres.join(', ');

    return (
        <Card view={'filled'} theme={'normal'} className={cn()}>
            <div className={cn('left-content')}>
                <Text variant={'header-1'}>{rang}</Text>
                <img className={cn('image')} src={imageURL}/>
                <div className={cn('info')}>
                    <Link className={cn('title')} href={`/films/${id}`}>{ruTitle}</Link>
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
                <DropdownMenu items={filmActions}/>
            </div>
        </Card>
    );
}
