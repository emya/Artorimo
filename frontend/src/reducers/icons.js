const initialState = {
  //{text: "Write code!"}
  isOrdered: null
};

export default function payment(state=initialState, action) {
  //let profileList = state.slice();

  switch (action.type) {
    case 'ORDER_ICON':
      return {...state, order: action.data, isOrdered: true};

    case 'GET_ICON_PARTS':
      return {...state, icon_parts: action.data};

    default:
      return state;
  }
}