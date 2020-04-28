const url = path => `${window.location.origin}/api/${path}`

// Auth
export const register = formData => {
    return new Promise((resolve, reject) => {
        axios.post(url("auth/register"), formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => {
            localStorage.setItem("JWTToken", res.data.access_token)
            resolve(res.data.profile)
        })
        .catch(() => {
            reject()
        })
    })
}

export const login = args => {
    return new Promise((resolve, reject) => {
        axios.post(url("auth/login"), args)
            .then(res => {
                localStorage.setItem("JWTToken", res.data.access_token)
                resolve(res.data.profile)
            })
            .catch(() => {
                reject()
            })
    })
}

export const logout = () => {
    axios.post(url("auth/logout"))
    localStorage.removeItem("JWTToken")
}

// Blogposts
export const getNewestPosts = page => axios.get(url("blogposts"), { params: { page } })

export const getBlogpost = id => axios.get(url("blogpost/"+id))

export const addBlogpost = args => axios.post(url("blogpost"), args)

export const editBlogpost = args => axios.put(url("blogpost"), args)

export const deleteBlogpost = id => axios.delete(url("blogpost/"+id))

export const likeBlogpost = id => axios.post(url("blogpost/like"), {id})

export const addRecommendation = id => axios.put(url("blogpost/recommend/"+id))

export const removeRecommendation = id => axios.delete(url("blogpost/recommend/"+id))

// Topics
export const getAllTopics = () => axios.get(url("topics"))

//Tags
export const getTags = () => axios.get(url("tags"))

//Comments
export const addComment = args => axios.post(url("comment"), args)

export const editComment = args => axios.put(url("comment"), args)

export const deleteComment = id => axios.delete(url("comment/"+id))

// Users
export const getUser = id => axios.get(url("user/"+id))

export const followUser = id => axios.post(url("user/follow"), {id})

export const unfollowUser = id => axios.post(url("user/unfollow"), {id})

export const followsUser = id => axios.get(url("user/follows/"+id))

// Profile
export const getProfile = () => axios.get(url("profile"))

export const editProfile = formData => axios.post(url("profile"), formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

export const getProfileBlogposts = () => axios.get(url("profile/blogposts"))