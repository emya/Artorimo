const initialState = {
  //{text: "Write code!"}
};

export default function profile(state=initialState, action) {
  //let profileList = state.slice();

  switch (action.type) {
    case 'FETCH_ARTISTS':
      return {...state, artists: action.data.artists};

    default:
      return state;
  }
}