const url = path => `${window.location.origin}/api/${path}`
const paginated = (path, pageNr) => `${path}?page=${pageNr}`

const putFormData = formData => {
    formData.append("method_put", true)
    return formData
}

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
export const getNewestBlogposts = () => axios.get(url("blogposts"))

export const getAllBlogposts = () => axios.get(url("blogposts/all"))

export const getBlogpost = id => axios.get(url("blogpost/"+id))

export const addBlogpost = formData => axios.post(url("blogpost"), formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

export const editBlogpost = formData => axios.post(url("blogpost"), putFormData(formData), {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

export const deleteBlogpost = id => axios.delete(url("blogpost/"+id))

export const deleteBlogpostAsset = id => axios.delete(url("blogpost/asset/"+id))

export const likeBlogpost = id => axios.post(url("blogpost/like"), {id})

export const addRecommendation = id => axios.put(url("blogpost/recommend/"+id))

export const removeRecommendation = id => axios.delete(url("blogpost/recommend/"+id))

// Topics
export const getAllTopics = () => axios.get(url("topics"))

export const getTopic = id => axios.get(url("topics/"+id))

export const getTopicBlogposts = (id, pageNr) => axios.get(paginated(url(`topics/${id}/blogposts`), pageNr))

export const addTopic = args => axios.post(url("topics"), args)

export const deleteTopic = id => axios.delete(url("topics/" + id))

//Tags
export const getAllTags = () => axios.get(url("tags"))

export const addTag = args => axios.post(url("tags"), args)

export const deleteTag = id => axios.delete(url("tags/"+id))

//Comments
export const addComment = args => axios.post(url("comment"), args)

export const editComment = args => axios.put(url("comment"), args)

export const deleteComment = id => axios.delete(url("comment/"+id))

// Users
export const getUser = id => axios.get(url("user/"+id))

export const getAllUsers = () => axios.get(url("users/all"))

export const getAvailableLinks = () => axios.get(url("users/links"))

export const followUser = id => axios.post(url("user/follow"), {id})

export const unfollowUser = id => axios.post(url("user/unfollow"), {id})

export const followsUser = id => axios.get(url("user/follows/"+id))

export const deleteUser = id => axios.delete(url("user/"+id))

// Profile
export const getProfile = () => axios.get(url("profile"))

export const editProfile = formData => axios.post(url("profile"), formData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

export const getProfileBlogposts = pageNr => axios.get(paginated(url("profile/blogposts"), pageNr))

export const getProfileComments = pageNr => axios.get(paginated(url("profile/comments"), pageNr))

export const getNewestSubscriptionPosts = () => axios.get(url("profile/subscriptions"))