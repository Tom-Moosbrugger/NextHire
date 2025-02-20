import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { validateEmail } from "../../helperfunctions/helperFunctions";
import './SignUpFormPage.css';

function SignUpFormPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Email address is required";
    } else if (email.length > 255) {
      validationErrors.email =
        "Email address cannot be longer than 255 characters";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!username) {
      validationErrors.username = "Username is required";
    } else if (username.length > 40) {
      validationErrors.username = "Username cannot be longer than 40 character";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length > 255) {
      validationErrors.username =
        "Password cannot be longer than 255 characters";
    }

    if (password !== confirmPassword)
      validationErrors.confirmPassword =
        "Passwords must match";

    setErrors(validationErrors);
  }, [email, username, password, confirmPassword]);

  if (user) return navigate('/home'); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).length) return setHasSubmitted(true);

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal()
      return navigate('/home');
    }
  };

  return (
    <article className="sign-up-form">
      <div aria-hidden="true" className="sign-up-container">
        <header>
          <h1>
            Sign up for <em>Next</em>Hire
          </h1>
          <div className="sign-up-form-error">
            {hasSubmitted && errors.server && <p>{errors.server}</p>}
          </div>
        </header>
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
          <div className="sign-up-form-error">
            {hasSubmitted && errors.email && <p>{errors.email}</p>}
          </div>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a username..."
            />
          </label>
          <div className="sign-up-form-error">
            {hasSubmitted && errors.username && <p>{errors.username}</p>}
          </div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password..."
            />
          </label>
          <div className="sign-up-form-error">
            {hasSubmitted && errors.password && <p>{errors.password}</p>}
          </div>
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type password..."
            />
          </label>
          <div className="sign-up-form-error">
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </article>
  );
}

export default SignUpFormPage;