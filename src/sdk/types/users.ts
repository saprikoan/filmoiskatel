import type { Review } from "./review";

export type User = {
    _id: string,
    username: string,
    reviews: Review[],
}