const initialState = {
  //{text: "Write code!"}
  myprofile: null,
  isUpdated: null
};

export default function profile(state=initialState, action) {
  //let profileList = state.slice();

  switch (action.type) {
    case 'UPDATE_PROFILE':
      //profileList.splice(0, 1, action.profile);
      return {...state, myprofile: [action.profile], isUpdated: true};

    case 'FETCH_PROFILE':
      return {...state, myprofile: action.profile};

    case 'FETCH_PROFILES':
      return {...state, profiles: action.profiles};

    default:
      return state;
  }
}