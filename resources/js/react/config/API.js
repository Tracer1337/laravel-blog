import format, { blogpost, blogposts, search, user, auth, assets, featuredPost, topic, topics } from "./format.js"
import Storage from "../utils/Storage.js"

const url = path => `${window.location.origin}/api/${path}`

const query = (url, name, value) => `${url}${url.includes("?") ? "&" : "?"}${name}=${value}`
const queryArray = (url, name, values) => url + values.reduce((query, value) => `${query}${(url + query).includes("?") ? "&" : "?"}${name}[]=${value}`, "")

const paginated = (url, pageNr) => query(url, "page", pageNr)

const putFormData = formData => {
    formData.append("method_put", true)
    return formData
}

const formHeader = {
    "Content-Type": "multipart/form-data"
}

// Auth
const authorize = post_url => {
    const formatter = format(auth)
    
    return args => {
        return new Promise((resolve, reject) => {
            axios.post(url(post_url), args)
                .then(res => {
                    if(args.remember_me) {
                        Storage.setLocal("JWTToken", res.data.access_token)
                    }

                    formatter(res)
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
    Storage.removeLocal("JWTToken")
}

// Blogposts
export const getNewestBlogposts = () => axios.get(url("blogposts")).then(format(blogposts))

export const getAllBlogposts = pageNr => axios.get(paginated(url("blogposts/all"), pageNr)).then(format(blogposts))

export const getBlogpost = id => axios.get(url("blogpost/"+id)).then(format(blogpost))

export const addBlogpost = formData => axios.post(url("blogpost"), formData, {
    headers: formHeader
})

export const editBlogpost = (formData, onUploadProgress) => axios.post(url("blogpost"), putFormData(formData), {
    onUploadProgress,
    headers: formHeader
})

export const deleteBlogpost = id => axios.delete(url("blogpost/"+id))

export const deleteBlogpostAsset = id => axios.delete(url("blogpost/asset/"+id))

export const likeBlogpost = id => axios.post(url("blogpost/like"), {id}).then(format(blogpost))

export const addRecommendation = id => axios.put(url("blogpost/recommend/"+id)).then(format(blogpost))

export const removeRecommendation = id => axios.delete(url("blogpost/recommend/"+id)).then(format(blogpost))

// Topics
export const getAllTopics = (withMeta = false) => axios.get(url("topics?with-meta=" + withMeta)).then(format(topics))

export const getTopic = id => axios.get(url("topics/"+id)).then(format(topic))

export const getTopicBlogposts = (id, pageNr) => axios.get(paginated(url(`topics/${id}/blogposts`), pageNr)).then(format(blogposts))

export const addTopic = args => axios.post(url("topics"), args)

export const editTopic = formData => axios.post(url("topics"), putFormData(formData), {
    headers: formHeader
})

export const deleteTopic = id => axios.delete(url("topics/"+id))

//Tags
export const getAllTags = (withMeta = false) => axios.get(url("tags?with-meta=" + withMeta))

export const getTag = id => axios.get(url("tags/"+id))

export const getTagsBlogposts = (ids, pageNr) => axios.get(
    paginated(
        queryArray(
            url(`tags/blogposts`)
        , "tag_ids", ids), 
    pageNr)
).then(format(blogposts))

export const addTag = args => axios.post(url("tags"), args)

export const editTag = formData => axios.post(url("tags"), putFormData(formData))

export const deleteTag = id => axios.delete(url("tags/"+id))

//Comments
export const addComment = args => axios.post(url("comment"), args)

export const editComment = args => axios.put(url("comment"), args)

export const deleteComment = id => axios.delete(url("comment/"+id))

// Users
export const getUser = id => axios.get(url("user/"+id)).then(format(user))

export const getAllUsers = () => axios.get(url("users/all"))

export const followUser = id => axios.post(url("user/follow"), {id})

export const unfollowUser = id => axios.post(url("user/unfollow"), {id})

export const followsUser = id => axios.get(url("user/follows/"+id))

export const deleteUser = id => axios.delete(url("user/"+id))

// Profile
export const getProfile = () => axios.get(url("profile")).then(format(user))

export const editProfile = formData => axios.post(url("profile"), formData, {
    headers: formHeader
})

export const getProfileBlogposts = pageNr => axios.get(paginated(url("profile/blogposts"), pageNr)).then(format(blogposts))

export const getProfileComments = pageNr => axios.get(paginated(url("profile/comments"), pageNr))

export const getNewestSubscriptionPosts = () => axios.get(url("profile/subscriptions")).then(format(blogposts))

// Search
export const getSearchResults = query => axios.get(url("search?query=" + query)).then(format(search))

// Roles
export const getRoles = () => axios.get(url("roles"))

export const assignRole = args => axios.post(url("roles/user"), args)

// Storage
export const getAllAssets = pageNr => axios.get(paginated(url("storage/assets"), pageNr)).then(format(assets))

export const deleteAsset = id => axios.delete(url("storage/asset/" + id))

// Configuration
export const getServerConfig = () => axios.get(url("config"))

// Featured Blogpost
export const getFeaturedPost = () => axios.get(url("featured")).then(format(featuredPost))

export const createFeaturedPost = args => axios.post(url("featured/create"), args)

export const removeFeaturedPost = () => axios.post(url("featured/remove"))