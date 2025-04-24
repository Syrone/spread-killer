import React from "react"

const WebpImage = ({ src, webp, alt, ...props }) => {
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img src={src} alt={alt} {...props} />
    </picture>
  )
}

export default WebpImage
