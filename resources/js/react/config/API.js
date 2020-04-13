const url = path => `${window.location.origin}/api/${path}`

// Auth
export const register = args => axios.post(url("auth/register"), args)

export const login = args => {
    return new Promise((resolve, reject) => {
        axios.post(url("auth/login"), args)
            .then(res => {
                localStorage.setItem("JWTToken", res.data.access_token)
                resolve()
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

export const getProfile = () => axios.get(url("auth/profile"))

// Blogposts
export const getBlogposts = () => axios.get(url("blogposts"))

export const getBlogpost = id => axios.get(url("blogpost/"+id))

export const addBlogpost = args => axios.post(url("blogpost"), args)

export const editBlogpost = args => axios.put(url("blogpost"), args)

export const deleteBlogpost = id => axios.delete(url("blogpost/"+id))

// Topics
export const getTopics = () => axios.get(url("topics"))

//Tags
export const getTags = () => axios.get(url("tags"))

//Comments
export const addComment = args => axios.post(url("comment"), args)

export const editComment = args => axios.put(url("comment"), args)

export const deleteComment = id => axios.delete(url("comment/"+id))