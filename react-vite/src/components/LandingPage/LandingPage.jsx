import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../redux/session";
import "./LandingPage.css";

const LandingPage = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(sessionActions.thunkAuthenticate());
  }, [dispatch]);

  const loginDemo = async () => {
    const serverResponse = await dispatch(
      sessionActions.thunkLogin({ email: "demo@aa.io", password: "password" })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      return navigate("/applications");
    }
  };

  return (
    <article className="landing-page">
      <div className="landing-page-container">
        <header>
          <h1>
            Welcome to <em>Next</em>Hire
          </h1>
          <p>
            Your search for what&apos;s <em>next</em> starts here
          </p>
        </header>
        <section>
          <button onClick={() => navigate("/sign-up")}>Sign Up</button>
          <button onClick={() => navigate("/log-in")}>Log In</button>
          <button onClick={loginDemo}>Log In as Demo User</button>
        </section>
        <div className="landing-page-error">
          {errors.server && <p>{errors.server}</p>}
        </div>
      </div>
    </article>
  );
};

export default LandingPage;
