import client from "./client"

export const uploadTrailer = async (formData, onUploadProgress) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.post('/movie/upload-trailer', formData, {
            headers: {
                Authorization: 'Bearer ' + token,
                'content-Type': 'multipart/form-data'
            },
            onUploadProgress: ({ loaded, total }) => {
                if (onUploadProgress) onUploadProgress(Math.floor((loaded / total) * 100))
            }
        })
        return data
    } catch (error) {
        return { error: error.response.data.error }
    }
}
export const uploadMovie = async (formData) => {
    const token = localStorage.getItem('auth-token')
    try {
        const { data } = await client.post('/movie/create-movie', formData, {
            headers: {
                Authorization: 'Bearer ' + token,
                'content-Type': 'multipart/form-data'
            }
        })
        return data
    } catch (error) {
        return { error: error.response.data.error }
    }
}