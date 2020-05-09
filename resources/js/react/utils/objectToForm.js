export default object => {
    const formData = new FormData()
    
    for (let key in object) {
        if(!Array.isArray(object[key])) {

            formData.append(key, object[key])

        } else {

            for(let subObject in object[key]) {
                formData.append(key + "[]", subObject)
            }

        }
    }

    return formData
}