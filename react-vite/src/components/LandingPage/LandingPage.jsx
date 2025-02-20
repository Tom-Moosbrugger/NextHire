import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import * as sessionActions from "../../redux/session";
import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);

  if (user) return navigate('/home');

  const loginDemo = async () => {
    await dispatch(
      sessionActions.thunkLogin({ email: "demo@aa.io", password: "password" })
    );
  };

  return (
    <article className="landing-page">
      <div aria-hidden="true" className="landing-page-container">
        <header>
          <h1>
            Welcome to <em>Next</em>Hire
          </h1>
          <p>
            your search for what&apos;s <em>next</em> starts here
          </p>
        </header>
        <section>
          <button onClick={() => navigate("/sign-up")}>Sign Up</button>
          <OpenModalButton
            modalComponent={<LoginFormModal />}
            buttonText="Log In"
            id="log-in"
          />
          <button onClick={loginDemo}>Log In as Demo User</button>
        </section>
      </div>
    </article>
  );
};

export default LandingPage;
