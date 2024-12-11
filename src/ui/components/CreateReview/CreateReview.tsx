import { useCallback } from "react";
import { Button, Text, TextArea, TextInput } from '@gravity-ui/uikit';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import block from 'bem-cn-lite';

import { sdk } from "@/sdk";
import useAuth from "@/ui/auth/useAuth";

import './CreateReview.scss';

export type CreateReviewProps = {
    movieId: string,
};

const cn = block('create-review');

export const CreateReview = ({movieId}: CreateReviewProps) => {
    const { register, handleSubmit, reset } = useForm(); 

    const onSubmit = useCallback(async (d: {title: string, review: string}) => {
        await sdk.postReview(d.title, d.review, movieId);
        reset();
    }, []);

    return (
        <div className={cn()}>
            <Text variant='subheader-3'>{'Написать рецензию'}</Text>

            <form className={cn('form')} onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
                <label>
                    <Text>{'Заголовок рецензии'}</Text>
                    <TextInput {...register('title', {required: true})} />
                </label>
                <label>
                    <Text>{'Текст рецензии'}</Text>
                    <TextArea rows={4} {...register('review', {required: true})} />
                </label>
                <Button type='submit' view='action'>{'Отправить'}</Button>
            </form>
        </div>
    )
}