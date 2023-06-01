import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { InitialLoginData, LoginSchema } from "./loginFormik";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: loginMutate, isLoading: loginLoading } = useMutation({
    mutationFn: (data) => authApi.loginCheck(data),
    onSuccess: (response) => {
      dispatch({ type: "USER", payload: response.data });
      navigate("/dashboard");
    },
    onError: (error) => {
      loginHandler.setFieldError("email", error?.data?.message);
      loginHandler.setFieldError("password", error?.data?.message);
    },
  });

  const loginHandler = useFormik({
    initialValues: InitialLoginData,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      loginMutate(values);
    },
  });

  const { handleBlur, handleChange, values, handleSubmit, errors, touched } =
    loginHandler;

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="flex h-full flex-wrap items-center justify-center">
          <div className="mb-12 md:mb-0">
            <form onSubmit={handleSubmit} className="flex flex-col p-12 gap-4">
              <h2 className="text-center">
                <strong>Login</strong> an account
              </h2>
              <div className="text-left">
                <Label
                  htmlFor="email"
                  value="Email"
                  color={errors.email && touched.email ? "failure" : ""}
                />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@flowbite.com"
                  value={values.email}
                  color={errors.email && touched.email ? "failure" : ""}
                  helperText={errors.email && touched.email ? errors.email : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="text-left">
                <Label
                  htmlFor="password"
                  value="Password"
                  color={errors.password && touched.password ? "failure" : ""}
                />
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  color={errors.password && touched.password ? "failure" : ""}
                  helperText={
                    errors.password && touched.password ? errors.password : ""
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button
                isProcessing={loginLoading}
                type="submit"
                className="mb-3"
              >
                Login
              </Button>
              <Link className="text-blue-500" to="/register">
                You don&apos;t have an account? Register here.
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
