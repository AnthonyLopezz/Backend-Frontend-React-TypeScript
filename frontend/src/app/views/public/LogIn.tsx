import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/style.css";
import Form from "react-bootstrap/Form";
import CreateUser from "../../models/User";
import { useState } from "react";
import { useForm } from "../../utilities/hooks/useForm";
import * as encrypt from "js-sha512";
import UserLogin from "../../services/UserLogin";
import ApiBackend from "../../utilities/domains/apiBackend";

export const LogIn = () => {
  // Variables
  const start = ApiBackend.URL + ApiBackend.PUBLIC_USER_LOGIN;
  const navigatee = useNavigate();
  type formHtlm = React.FormEvent<HTMLFormElement>;
  const [inProcess, setProcess] = useState<boolean>(false);
  let { emailUser, passwordUser, dobleLink, obj } =
    useForm<CreateUser>(new CreateUser("", "", ""));

  const clearBox = (form: HTMLFormElement) => {
    form.reset();
    obj.emailUser = "";
    obj.passwordUser = "";

    form.emailUser.value = "";
    form.passwordUser.value = "";

    form.classList.remove("was-validated");
  };

  const formProcessing = async (fh: formHtlm) => {
    fh.preventDefault();
    setProcess(true);
    const currentForm = fh.currentTarget;
    currentForm.classList.add("was-validated");

    if (currentForm.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      // npm i js-sha512
      const encryptedPass = encrypt.sha512(obj.passwordUser);
      obj.passwordUser = encryptedPass;
      const result = await UserLogin.consumService(start, obj);
      console.log(result);

      if (result.Token) {
        localStorage.setItem("Token", result.Token);
        console.log("CONTEXT");
        setProcess(false);
        navigatee("/home");
      } else {
        clearBox(currentForm);
      }
    }
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4"></div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Login to Your Account
                      </h5>
                      <p className="text-center small">
                        Enter your username & password to login
                      </p>
                    </div>

                    <Form
                      className="row g-3"
                      noValidate
                      validated={inProcess}
                      onSubmit={formProcessing}
                    >

                      <div className="col-12">
                        <Form.Group controlId="emailUser">
                          <Form.Label>Email</Form.Label>
                          <div className="input-group">
                            <span className="input-group-text">@</span>
                            <Form.Control
                              required
                              type="email"
                              name="emailUser"
                              className="form-control"
                              value={emailUser}
                              onChange={dobleLink}
                              placeholder="Email"
                            />
                            <Form.Control.Feedback type="invalid">
                              You must type your email.
                            </Form.Control.Feedback>
                          </div>
                        </Form.Group>
                      </div>

                      <div className="col-12">
                        <Form.Group controlId="passwordUser">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            required
                            type="password"
                            name="passwordUser"
                            minLength={6}
                            className="form-control"
                            value={passwordUser}
                            onChange={dobleLink}
                            placeholder="Password"
                          />
                          <Form.Control.Feedback type="invalid">
                            You must type your password.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Login
                        </button>
                      </div>
                      <div className="col-12">
                      <p className="small mb-0">
                        Create account? <Link to="/register">Sign In</Link>
                      </p>
                    </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
