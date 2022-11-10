import React from 'react'

const ImageMessage = ({images}) => {
    console.log(images);
  return (
    <>
        {
            images.map((image,index) => (
                <img key={index} src={image} alt='' />
            ))
        }
    </>
  )
}

export default ImageMessage