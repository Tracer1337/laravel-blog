async function getImageData(imgSource) {
    const image = new Image()
    
    const [width, height] = await new Promise(resolve => {
        image.onload = function () {
            resolve([this.width, this.height])
        }
        image.src = imgSource
    })

    const canvas = document.createElement("canvas")
    canvas.width = width; canvas.height = height

    const context = canvas.getContext("2d")
    context.drawImage(image, 0, 0, width, height)
    const imageData = context.getImageData(0, 0, width, height).data

    return imageData
}

function getAverageRGBValues(data) {
    let avgR = 0, avgG = 0, avgB = 0

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        if(r && g && b) {
            avgR += r
            avgG += g
            avgB += b
        }
    }

    const amountOfPixels = data.length / 4

    avgR = Math.round(avgR / amountOfPixels)
    avgG = Math.round(avgG / amountOfPixels)
    avgB = Math.round(avgB / amountOfPixels)

    return [avgR, avgG, avgB]
}

async function getImageGradient(imgSource) {
    if(!imgSource) {
        return ""
    }
    
    // Get Pixel values from image
    const data = await getImageData(imgSource)
    
    // Split data into top - bottom parts by leaving a gap in the middle
    // (1 - gap) / 2
    //      gap
    // (1 - gap) / 2
    const gap = 0.8
    const halfLength =  Math.ceil(data.length / 2)
    const top = data.slice(0, halfLength - halfLength * gap)
    const bottom = data.slice(halfLength + halfLength * gap, data.length)

    // Calculate average pixel-values for top and bottom half
    const avgTop = getAverageRGBValues(top)
    const avgBottom = getAverageRGBValues(bottom)

    // Generate CSS Gradient
    const rgbTop = `rgb(${avgTop[0]}, ${avgTop[1]}, ${avgTop[2]})`
    const rgbBottom = `rgb(${avgBottom[0]}, ${avgBottom[1]}, ${avgBottom[2]})`
    const gradient = `linear-gradient(${rgbTop}, ${rgbBottom})`

    return gradient
}

export default getImageGradient