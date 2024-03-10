// localStorage.getItem('auth-token')
import client from "./client"

export const addReview = async (movieId, reviewData) => {
    const token = localStorage.getItem("auth-token")
    try {
        const { data } = await client.post(`/review/add/${movieId}`, reviewData, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        return data
    } catch (error) {
        return error
    }
}

export const getReviewsByMovie = async (movieId) => {
    try {
        const { data } = await client.get(`/review/get-reviews-by-movie/${movieId}`)
        return data
    } catch (error) {
        return error
    }
}