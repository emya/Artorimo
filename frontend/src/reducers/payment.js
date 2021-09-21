const initialState = {
  //{text: "Write code!"}
};

export default function payment(state=initialState, action) {
  //let profileList = state.slice();

  switch (action.type) {
    case 'GET_PAYPAL':
      return {...state, paypal_form: action.data.form};

    default:
      return state;
  }
}