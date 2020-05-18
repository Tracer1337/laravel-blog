import format, { blogpost, blogposts, search, user } from "./format.js"

const url = path => `${window.location.origin}/api/${path}`
const paginated = (path, pageNr) => `${path}?page=${pageNr}`

const putFormData = formData => {
    formData.append("method_put", true)
    return formData
}

// Auth
const authorize = post_url => {
    return args => {
        return new Promise((resolve, reject) => {
            axios.post(url(post_url), args)
                .then(res => {
                    if(args.remember_me) {
                        localStorage.setItem("JWTToken", res.data.access_token)
                    }

                    resolve(res.data)
                })
                .catch(() => {
                    reject()
                })
        })
    }
}
 
export const register = authorize("auth/register")

export const login = authorize("auth/login")

export const logout = () => {
    axios.post(url("auth/logout"))
    localStorage.removeItem("JWTToken")
}

// Blogposts
export const getNewestBlogposts = () => axios.get(url("blogposts")).then(format(blogposts))

export const getAllBlogposts = pageNr => axios.get(paginated(url("blogposts/all"), pageNr)).then(format(blogposts))

export const getBlogpost = id => axios.get(url("blogpost/"+id)).then(format(blogpost))

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

export const getTopicBlogposts = (id, pageNr) => axios.get(paginated(url(`topics/${id}/blogposts`), pageNr)).then(format(blogposts))

export const addTopic = args => axios.post(url("topics"), args)

export const deleteTopic = id => axios.delete(url("topics/"+id))

//Tags
export const getAllTags = () => axios.get(url("tags"))

export const getTag = id => axios.get(url("tags/"+id))

export const getTagBlogposts = (id, pageNr) => axios.get(paginated(url(`tags/${id}/blogposts`), pageNr)).then(format(blogposts))

export const addTag = args => axios.post(url("tags"), args)

export const deleteTag = id => axios.delete(url("tags/"+id))

//Comments
export const addComment = args => axios.post(url("comment"), args)

export const editComment = args => axios.put(url("comment"), args)

export const deleteComment = id => axios.delete(url("comment/"+id))

// Users
export const getUser = id => axios.get(url("user/"+id)).then(format(user))

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

export const getProfileBlogposts = pageNr => axios.get(paginated(url("profile/blogposts"), pageNr)).then(format(blogposts))

export const getProfileComments = pageNr => axios.get(paginated(url("profile/comments"), pageNr))

export const getNewestSubscriptionPosts = () => axios.get(url("profile/subscriptions")).then(format(blogposts))

// Search
export const getSearchResults = query => axios.get(url("search?query=" + query)).then(format(search))

// Roles
export const getRoles = () => axios.get(url("roles"))

export const assignRole = args => axios.post(url("roles/user"), args)