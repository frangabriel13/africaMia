import React, { useState, useRef } from "react";
import s from "./GalleryProduct.module.css";

const GalleryProduct = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0].url);
  const imageRefs = useRef([]);

  const handleClick = (url, index) => {
    setSelectedImage(url);
    imageRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };
  
  return (
    <div className={s.container}>
      <div className={s.imageList}>
        {
          images.map((image, index) => (
            <img
              key={image.id}
              src={image.url}
              alt={`Thumbnail ${index}`}
              onClick={() => handleClick(image.url, index)}
            />
          ))
        }
      </div>
      <div className={s.images}>
        {
          images.map((image, index) => (
            <img
              key={image.id}
              src={image.url}
              alt={`Image ${index}`}
              className={s.image}
              ref={el => imageRefs.current[index] = el}
            />
          ))
        }
      </div>
    </div>
  )
};


export default GalleryProduct;

// import React, { useState, useRef } from "react";
// import s from "./GalleryProduct.module.css";

// const GalleryProduct = ({ images }) => {
//   const [selectedImage, setSelectedImage] = useState(images[0].url);
//   const imageRefs = useRef([]);

//   const handleClick = (url, index) => {
//     setSelectedImage(url);
//     imageRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
//   };

//   return (
//     <div className={s.container}>
//       <div className={s.imageList}>
//         {
//           images.map((image, index) => (
//             <img
//               key={image.id}
//               src={image.url}
//               alt={`Thumbnail ${index}`}
//               onClick={() => handleClick(image.url, index)}
//             />
//           ))
//         }
//       </div>
//       <div className={s.images}>
//         {
//           images.map((image, index) => (
//             <img
//               key={image.id}
//               src={image.url}
//               alt={`Image ${index}`}
//               className={s.image}
//               ref={el => imageRefs.current[index] = el}
//             />
//           ))
//         }
//       </div>
//     </div>
//   )
// };

// export default GalleryProduct;