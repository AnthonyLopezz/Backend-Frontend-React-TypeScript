import { useState, ChangeEvent } from "react";

//The most popular hook in react. React boys' hook. 

export const useForm = <T extends Object>(initialObject: T) => {
  const [obj, setObj] = useState(initialObject);
  const dobleLink = ({ target }: ChangeEvent<any>) => {
    const { name, value } = target;
    setObj({
      //Desestructurar objeto - tres puntos para separar - se tiene acceso a las propiedades y son las que vienen en target
      ...obj,
      [name]: value,
    });
  };
  return {
    obj,
    dobleLink,
    ...obj,
  };
};
