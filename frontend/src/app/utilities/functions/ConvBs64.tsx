
export const ConvBs64 = async (imagenCargada: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imagenCargada);
      
      fileReader.onload = () => {resolve(fileReader.result);};
  
      fileReader.onerror = (error) => {reject(error);};
    });
  };
  