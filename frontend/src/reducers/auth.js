const initialState = {
  token: localStorage.getItem("token"),
  isPasswordUpdated: null,
  isValidToken: null,
  isForgotEmailSent: null,
  isRegistered: null,
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: {},
};


export default function auth(state=initialState, action) {

  switch (action.type) {

    case 'USER_LOADING':
        return {...state, isLoading: true};

    case 'USER_LOADED':
        return {...state, isAuthenticated: true, isLoading: false, user: action.user};

    case 'LOGIN_SUCCESSFUL':
    case 'REGISTRATION_SUCCESSFUL':
        localStorage.setItem("token", action.data.token);
        return {...state, ...action.data, isRegistered: true, isAuthenticated: true, isLoading: false, errors: null};

    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    case 'REGISTRATION_FAILED':
    case 'LOGOUT_SUCCESSFUL':
        localStorage.removeItem("token");
        return {...state, errors: action.data, token: null, user: null,
            isAuthenticated: false, isLoading: false};

    case 'VALIDATE_TOKEN_SUCCESSFUL':
        return {...state, isValidToken: true};

    case 'FORGOT_PASSWORD_SUCCESSFUL':
        return {...state, isForgotEmailSent: true};

    case 'UPDATE_PASSWORD_SUCCESSFUL':
        return {...state, isPasswordUpdated: true};

    case 'UPDATE_PASSWORD_ERROR':
        return {...state, errors: action.data};

    case 'VALIDATE_TOKEN_SUCCESSFUL':
        return {...state, isValidToken: true};

    default:
      return state;
  }
}