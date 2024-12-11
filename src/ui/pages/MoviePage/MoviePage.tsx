import { useCallback, useEffect, useState } from 'react';
import  { SquareDot, Eye} from '@gravity-ui/icons';
import { Button, Icon, Loader, Text } from '@gravity-ui/uikit';
import { useParams } from 'react-router-dom';

import block from 'bem-cn-lite';

import { sdk } from '@/sdk';

import { DefaultPage } from '@/ui/pages/DefaultPage/DefaultPage';
import { Movie } from '@/sdk/types/movie';
import { getMovieDuration } from '@/ui/utils/getMovieDuration';

import { InfoTable } from '@/ui/components/InfoTable/InfoTable';
import { Review } from '@/sdk/types/review';

import './MoviePage.scss';
import { ReviewsBlock } from '@/ui/components/ReviewsBlock/ReviewsBlock';
import { CreateReview } from '@/ui/components/CreateReview/CreateReview';
import useAuth from '@/ui/auth/useAuth';

const cn = block('movie');

export const MoviePage = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [isWatched, setIsWatched] = useState(false);
    const [willWatch, setWillWatch] = useState(false)
    
    const [movie, setMovie] = useState<Movie>();
    const [loading, setLoading] = useState(false);
    const [reviewsLoading, setRevieswLaoding] = useState(false);
    const [reviews, setReviews] = useState<Review[]>();
    const [isError, setIsErorr] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const newMovie = await sdk.getMovie(id ?? '');
                setMovie(newMovie.data);
            } catch (error) {
                setIsErorr(true);
                console.error(error);
            }
            setLoading(false);
        }
        
        if (id) {
            console.log(user);
            setIsWatched(user?.watched?.includes(id) ?? false);
            console.log(user?.watched?.includes(id) ?? false);
            console.log(user?.willWatch?.includes(id));
            setWillWatch(user?.willWatch?.includes(id) ?? false);
        }

        
        void fetchData();
    }, [id, user?.watched, user, user?.willWatch]);


    useEffect(() => {
        const fetchReviews = async () => {
            if(!movie) {
                return; 
            }

            try {
                setRevieswLaoding(true);
                const reviewsResponse = await sdk.getReviews(movie.id);
                setReviews(reviewsResponse.data);
            } catch (error) {
                setIsErorr(true);
                console.error(error);
            }
            setRevieswLaoding(false);
        }

        if(movie) {
        void fetchReviews();
        }
    }, [movie]);

    const onWillWatchClick = useCallback(async () => {
        setWillWatch((value) => !value);

        if (id) {
            await sdk.willWatch(id);
        }
    }, [id]);

    const onWatchedClick = useCallback(async () => {
        if(!isWatched) setWillWatch(false);
        setIsWatched((value) => !value);

        if (id) {
            await sdk.watched(id);
        }
    }, [id, isWatched]);

    if (isError) {
        return <Text color='warning'>{'Ошибка при загрузке страницы'}</Text>
    }

    if (loading || !movie) {
        return <Loader />
    }

    const countriesString = movie.countries.map(country => country.name).join(', ');
    const genresString = movie.genres.map(genre => genre.name).join(', ');

    const infoItems = [
        {title: 'Название', value: movie.name},
        {title: 'Альтернативное название', value: movie.alternativeName},
        {title: 'Год выхода', value: movie.year},
        {title: 'Длительность', value: getMovieDuration(movie.movieLength)},
        {title: 'Страны', value: countriesString},
        {title: 'Жанры', value: genresString},
        {title: 'Рейтинг на Кинопоиске', value: movie.rating.kp},
        {title: 'Рейтинг IMDB', value: movie.rating.imdb}
    ]

    return (
        <DefaultPage title={movie.name}>
            <Text color='misc' id='#anchor'>{movie.slogan}</Text>
            <div className={cn('content')}>
                <img className={cn('image')} src={movie.poster.url}/>
                <div className={cn('right-side')}>
                    <InfoTable items={infoItems}/>

                    <div className={cn('buttons')}>
                        <Button
                            onClick={onWillWatchClick}
                            size='l'
                            className={cn('button')} 
                            view={willWatch ? 'outlined-action' :'action'}>
                                {willWatch && <Icon data={SquareDot}/>}{'Буду смотреть'}
                            </Button>
                        <Button 
                            onClick={onWatchedClick} 
                            size='l'
                            view={isWatched ? 'outlined-info' : 'normal'}
                            className={cn('button')}
                            >{
                                isWatched && <Icon data={Eye}/>}{'Просмотрен'}
                            </Button>
                    </div>
                </div>
            </div>
            <Text className={cn('description')}>{movie.description}</Text>

            

            {id && <CreateReview movieId={id}/>}

            {reviewsLoading && <Loader/>}

            {reviews && <ReviewsBlock items={reviews}/>}

            <img className={cn('backdrop')} src={movie.backdrop.url}/>
        </DefaultPage>
    );
};
