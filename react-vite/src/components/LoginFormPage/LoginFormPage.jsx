import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { validateEmail } from "../../resources/helperFunctions";
import * as sessionActions from "../../redux/session";
import "./LoginFormPage.css";

function LoginFormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(sessionActions.thunkAuthenticate());
  }, [dispatch]);

  useEffect(() => {
    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Email address is required";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!password) validationErrors.password = "Password is required";

    setErrors(validationErrors);
  }, [email, password]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).length) return setHasSubmitted(true);

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/applications");
    }
  };

  return (
    <article className="log-in-form">
      <div className="log-in-container">
        <h1>
          Log in to <em>Next</em>Hire
        </h1>
        <div className="log-in-form-error">
          {hasSubmitted && errors.server && <p>{errors.server}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
            />
          </label>
          <div className="log-in-form-error">
            {hasSubmitted && errors.email && <p>{errors.email}</p>}
          </div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
            />
          </label>
          <div className="log-in-form-error">
            {hasSubmitted && errors.password && <p>{errors.password}</p>}
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </article>
  );
}

export default LoginFormPage;
