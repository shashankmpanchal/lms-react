import React from "react";
import { Button, Navbar } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { fakeAuthProvider } from "../auth";
import reactLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export let AuthContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);
  const state = useSelector((state) => state);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    callback();
  };

  let value = { state, user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const state = useSelector((state) => state);
  return state;
  // return React.useContext(AuthContext);
}

// export function AuthStatus() {
//   let auth = useAuth();
//   let navigate = useNavigate();

//   if (!auth.user) {
//     return <p>You are not logged in.</p>;
//   }

//   return (
//     <p>
//       Welcome {auth.user}!{" "}
//       <button
//         onClick={() => {
//           auth.signout(() => navigate("/"));
//         }}
//       >
//         Sign out
//       </button>
//     </p>
//   );
// }

// eslint-disable-next-line react/prop-types

export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username");

    auth.signin(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

const Layout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout(callback) {
    dispatch({ type: "LOGOUT" });
    callback();
  }

  return (
    <div>
      <Navbar className="bg-zinc-950 rounded-none" fluid>
        <Navbar.Brand href="/dashboard">
          <img
            alt="Flowbite React Logo"
            className="mr-3 h-6 sm:h-9"
            src={reactLogo}
          />
        </Navbar.Brand>
        <div className="flex items-center gap-2 md:order-2">
          <p className="text-white">Welcome {auth?.user?.name ?? ""}</p>
          <Button
            size="md"
            onClick={() => {
              logout(() => navigate("/"));
            }}
          >
            Logout
          </Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="text-white">
          <Link className="hover:text-gray" to="/dashboard">
            <p>Dashboard</p>
          </Link>
          <Link to="/leaves">
            <p>Leave</p>
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <div className="mt-6 px-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
