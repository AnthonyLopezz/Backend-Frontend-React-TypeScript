import { useNavigate } from "react-router-dom";
import logo from "../../../assets/img/not-found.svg";

export const DontFound = () => {
  const regresar = useNavigate();

  return (
    <div>
      <div className="container">
        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>404</h1>
          <h2>The page you are looking for doesn't exist.</h2>
          <a className="btn" onClick={() => regresar(-1)}>
            Back to home
          </a>
          <img src={logo} className="img-fluid py-5" alt="Page Not Found" />
        </section>
      </div>
    </div>
  );
};
