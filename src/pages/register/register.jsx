import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { InitialRegisterData, RegisterSchema } from "./registerFormik";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: registerMutate, isLoading: registerLoading } = useMutation({
    mutationFn: (data) => authApi.register(data),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      registerHandler.setFieldError("email", error.data.message);
    },
  });

  const registerHandler = useFormik({
    initialValues: InitialRegisterData,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log("values => ", values);
      registerMutate(values);
    },
  });

  const { handleBlur, handleChange, values, handleSubmit, errors, touched } =
    registerHandler;

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="flex h-full flex-wrap items-center justify-center">
          <div className="mb-12 md:mb-0">
            <form onSubmit={handleSubmit} className="flex flex-col p-12 gap-4">
              <h2 className="text-center">
                <strong>Create</strong> an account.
              </h2>
              <div className="text-left">
                <Label
                  htmlFor="name"
                  value="Name"
                  color={errors.name && touched.name ? "failure" : ""}
                />
                <TextInput
                  id="name"
                  type="text"
                  name="name"
                  placeholder="name"
                  value={values.name}
                  color={errors.name && touched.name ? "failure" : ""}
                  helperText={errors.name && touched.name ? errors.name : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
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
                  autoComplete=""
                />
              </div>
              <div className="text-left">
                <Label htmlFor="mobile" value="mobile" />
                <TextInput
                  id="mobile"
                  type="text"
                  name="mobile"
                  placeholder="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <Button isProcessing={false} type="submit" className="mb-3">
                Register
              </Button>
              <Link className="text-blue-500" to="/">
                You already have an account? Login here.
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
