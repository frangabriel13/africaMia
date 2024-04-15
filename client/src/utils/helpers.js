export const formatName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const calculateTotal = (product, quantity, variations, variationQuantities) => {
  let total = 0;

  if (product.isVariable === false) {
    total = quantity * product.price;
  } else {
    variations.forEach((variation) => {
      const quantityForVariation = variationQuantities[variation.id] || 0;
      total += quantityForVariation * variation.price;
    });
  }

  return total;
};

export const randomPhoneNumber = () => {
  const phoneNumbers = [
    '+541140428668',
    '+541149472679',
    '+541128311122',
  ];
  const randomNumber = Math.floor(Math.random() * phoneNumbers.length);
  return phoneNumbers[randomNumber];
};

export const resizeImage = (file) => {
  return new Promise((resolve) => {
    const maxSize = 1200; // Puedes ajustar el tamaño máximo según tus necesidades
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type });
          resolve(resizedFile);
        }, file.type);
      };
    };
  });
};