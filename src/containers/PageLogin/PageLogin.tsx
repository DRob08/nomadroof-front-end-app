import React, { FC, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { loginUser, checkEmailAvailability } from '../../api/axios';
import { useAuth } from "contexts/AuthContext"; 

export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState([]);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const [emailAvailabilityError, setEmailAvailabilityError] = useState(null);
  const { isLoggedIn, login } = useAuth();

  const navigate = useNavigate();

  const handleContinueClick = async () => {
    try {
      console.log("I am logging in");
  
      if (!email || !password) {
        setGeneralError("Please provide both email and password.");
        return;
      }
  
      const userData = {
        email,
        password,
      };
  
      const response = await loginUser(userData);

      login();
  
      if (response.status === 'created' && response.logged_in) {
        // Redirect to the dashboard upon successful login
        navigate("/account");
      } else {
        // Handle other cases, e.g., show an error message
        console.error('Login failed:', response);
      }
    } catch (error: any) {
      console.error("Login error:", error);
  
      if (error.response) {
        // Handle error response
        const responseData = error.response.data;
        if (responseData && responseData.errors) {
          const errorsArray = responseData.errors as string[];
  
          const incorrectPasswordError = errorsArray.find(
            (errMsg) => errMsg === "Incorrect password"
          );
  
          if (incorrectPasswordError) {
            setGeneralError(incorrectPasswordError);
          } else {
            setGeneralError("Login failed. Please fix the following errors:");
          }
        } else {
          setGeneralError("An unexpected error occurred during login.");
        }
      } else {
        // Handle other error cases
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Booking React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input type="email" placeholder="example@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link>
              </span>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
            </label>
            <ButtonPrimary type="button" onClick={handleContinueClick}>
              Continue
            </ButtonPrimary>
          </form>
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? <Link to="/signup">Create an account</Link>
          </span>
          {generalError && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              <p>{generalError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
