import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MessageToastify = (tipo: string, texto: string, milisegundos: number) => {
  const option = String(tipo.toLowerCase());
  switch (option) {
    case "error":
      toast.error(texto,
        {
          position: "top-center", autoClose: milisegundos, hideProgressBar: false, closeOnClick: true, 
          pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
        }
      );
      break;
      case "success":
        toast.success(texto,
          {
            position: "top-center", autoClose: milisegundos, hideProgressBar: false, closeOnClick: true, 
            pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
          }
        );
        break;
        case "info":
            toast.info(texto,
              {
                position: "top-center", autoClose: milisegundos, hideProgressBar: false, closeOnClick: true, 
                pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
              }
            );
        break;
        case "warning":
            toast.warning(texto,
              {
                position: "top-center", autoClose: milisegundos, hideProgressBar: false, closeOnClick: true, 
                pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
              }
            );
        break;
    default:
        console.log("Option does not exist!", option);
      break;
  }
};