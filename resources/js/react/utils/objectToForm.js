export default object => {
    const formData = new FormData()
    
    for (let key in object) {
        if(typeof object[key] === "undefined") {
            continue
        }

        if(!Array.isArray(object[key])) {

            formData.append(key, object[key])

        } else {

            for(let subObject of object[key]) {
                formData.append(key + "[]", subObject)
            }

        }
    }

    return formData
}