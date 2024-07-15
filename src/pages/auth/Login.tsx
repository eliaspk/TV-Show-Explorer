import React, { useState, FormEvent, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import ActionButton from "../../components/common/ActionButton";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  // Define any props here if needed
}

interface FormErrors {
  username?: string;
  password?: string;
}

const Login: React.FC<LoginProps> = () => {
  const { signIn, isLoading, user, error: authError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    let errors: FormErrors = {};
    if (!email) {
      errors.username = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    // If there are errors, set them and prevent form submission
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    await signIn(email, password);
  };

  useEffect(() => {
    if (user?.id) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="flex max-w-2xl items-center justify-center mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-3xl text-center font-bold mb-4">Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Username"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          {authError && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0"></div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {authError.message}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <ActionButton
              text="Login"
              loadingText="Logging in..."
              isLoading={isLoading}
              type="submit"
              fullWidth
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
