import React from 'react'

const ImageMessage = ({images,setCarousel}) => {
  const handleOnClick = (img) => {
    setCarousel({open:true,selected:img})
  };
  return (
    <>
        {
            images.map((image,index) => (
                <img key={index} src={image} onClick={()=>handleOnClick(image)} alt='' />
            ))
        }
    </>
  )
}

export default ImageMessage