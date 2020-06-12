const initialState = {
  //{text: "Write code!"}
  myportfolio: null,
  isUpdated: null
};

export default function profile(state=initialState, action) {
  //let profileList = state.slice();

  switch (action.type) {
    case 'UPDATE_PORTFOLIO':
      //profileList.splice(0, 1, action.profile);
      return {...state, myportfolio: [action.portfolio], isUpdated: true};

    case 'FETCH_PORTFOLIO':
      return {...state, myportfolio: action.portfolio};

    default:
      return state;
  }
}