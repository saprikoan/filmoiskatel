import { useEffect, useState } from 'react';
import { DropdownMenu, Link, Loader, Text } from '@gravity-ui/uikit';
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

const cn = block('movie');

export const MoviePage = () => {
    const { id } = useParams();
    
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
        
        void fetchData();
    }, [id]);


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
                <InfoTable items={infoItems}/>
            </div>
            <Text className={cn('description')}>{movie.description}</Text>

            

            {id && <CreateReview movieId={id}/>}

            {reviewsLoading && <Loader/>}

            {reviews && <ReviewsBlock items={reviews}/>}

            <img className={cn('backdrop')} src={movie.backdrop.url}/>
        </DefaultPage>
    );
};
