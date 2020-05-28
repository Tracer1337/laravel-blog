import React, { useEffect, useRef } from "react"

const GradientGapVisualisation = ({ imgSrc, gapSize }) => {
    gapSize = parseFloat(gapSize)

    const canvas = useRef()

    const drawGap = async () => {
        // Draw image
        const img = await new Promise(resolve => {
            const img = new Image()
            img.onload = function () {
                resolve(this)
            }
            img.src = imgSrc
        })

        let width, height

        if (img.width > img.height) {
            width = canvas.current.parentElement.getBoundingClientRect().width
            height = width * (img.height / img.width)
        } else {
            height = 300
            width = height * (img.width / img.height)
        }

        canvas.current.width = width
        canvas.current.height = height

        const context = canvas.current.getContext("2d")
        context.drawImage(img, 0, 0, width, height)

        const line = (x1, y1, x2, y2) => {
            context.strokeStyle = "lightgreen"
            context.lineWidth = 2
            context.beginPath()
            context.moveTo(x1, y1)
            context.lineTo(x2, y2)
            context.stroke()
        }

        const fill = (y1, y2) => {
            context.fillStyle = "rgba(144, 238, 144, .25)"
            context.beginPath()
            context.rect(0, y1, width, y2)
            context.fill()
        }

        const halfSize = height / 2
        const y1 = halfSize - halfSize * gapSize
        const y2 = halfSize + halfSize * gapSize
        line(0, y1, width, y1)
        line(0, y2, width, y2)
        fill(0, y1)
        fill(y2, height)
    }

    useEffect(() => {
        if(imgSrc) {
            drawGap()
        }
    }, [imgSrc, gapSize])

    return <canvas ref={canvas} />
}

export default GradientGapVisualisation