const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "{}")
    : null,
  access: localStorage.getItem("access"),
  leaves: [],
};

export const ReducerStore = (state = initialState, action) => {
  switch (action.type) {
    case "USER": {
      const data = {
        email: action.payload.email,
        name: action.payload.name,
        id: action.payload.employeeId,
      };
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("access", action.payload.token);
      return {
        ...state,
        user: data,
        access: action.payload.token,
      };
    }
    case "LOGOUT": {
      localStorage.clear();
      return {
        ...state,
        user: null,
        access: "",
      };
    }
    case "LEAVES": {
      return {
        ...state,
        leaves: [...state.leaves, action.payload],
      };
    }
    default:
      return state;
  }
};
