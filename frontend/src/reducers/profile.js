const initialState = [
  //{text: "Write code!"}
];

export default function profile(state=initialState, action) {
  let profileList = state.slice();

  switch (action.type) {
    case 'UPDATE_PROFILE':
      profileList.splice(0, 1, action.profile);
      return profileList;
      /*
      return [...state, ...action.profile];
      */

    case 'FETCH_PROFILES':
      return [...state, ...action.profile];

    default:
      return state;
  }
}