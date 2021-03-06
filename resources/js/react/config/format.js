export const blogpost = "blogpost"
export const blogposts = "blogposts"
export const search = "search"
export const user = "user"
export const auth = "auth"
export const assets = "assets"
export const featuredPost = "featuredPost"
export const topic = "topic"
export const topics = "topics"

const formatBlogpost = post => {
    // Format user
    if(post.user) {
        formatUser(post.user)
    }

    // Format comment's users
    if(post.comments) {
        post.comments.forEach(comment => formatUser(comment.user))
    }

    // Create assets
    if (!post.assets) {
        post.assets = []
    } else {
        post.assets.forEach(formatAsset)
    }

    // Format relation blogposts
    if(post.relations) {
        post.relations.forEach(formatBlogpost)
    }

    // Extract cover
    post.cover = post.assets.find(asset => asset.type === "cover")

    // Add estimated reading time
    if(post.content) {
        const amountOfWords = post.content.match(/[\w\d]+/g).length

        // Calculate with 200 words per minute
        post.estimated_reading_time = Math.round(amountOfWords / 200)
    }
}

const formatSearch = data => {
    // Format all blogposts
    data.blogposts.forEach(formatBlogpost)

    // Format all users
    data.authors.forEach(formatUser)
}

const formatUser = data => {
    data.full_name = data.first_name + " " + data.last_name
    
    // Format all blogposts
    if(data.recommendations) {
        data.recommendations.forEach(formatBlogpost)
    } else {
        data.recommendations = []
    }
}

const formatAsset = data => {
    if(data.user) {
        formatUser(data.user)
    }

    if(data.blogpost) {
        formatBlogpost(data.blogpost)
    }

    // Create meta of assets
    if (!data.meta) {
        data.meta = {}
    } else {
        data.meta = JSON.parse(data.meta)
    }
}

const formatTopic = data => {
    if(!data.cover) {
        data.cover = {}
    }
}

const formatArray = f => res => res.data.data.forEach(f)

const format = type => {    
    let f
    
    if (type === blogpost) {
        f = res => formatBlogpost(res.data.data)

    } else if (type === blogposts) {
        f = formatArray(formatBlogpost)

    } else if (type === search) {
        f = res => formatSearch(res.data)

    } else if (type === user) {
        f = res => formatUser(res.data.data)

    } else if (type === auth) {
        f = res => formatUser(res.data.profile)

    } else if (type === assets) {
        f = formatArray(formatAsset)

    } else if (type === featuredPost) {
        f = res => formatBlogpost(res.data.blogpost)

    } else if (type === topic) {
        f = res => formatTopic(res.data.data)

    } else if (type === topics) {
        f = formatArray(formatTopic)
    }

    return res => {
        f(res)
        return res
    }
}

export default format