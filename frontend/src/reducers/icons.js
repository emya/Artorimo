import update from 'react-addons-update';

const initialState = {
  //{text: "Write code!"}
  isOrdered: null,
  orderCompleted: null
};

export default function payment(state=initialState, action) {
  //let profileList = state.slice();

  switch (action.type) {
    case 'ORDER_ICON':
      return {...state, order: action.data, isOrdered: true};

    case 'FETCH_ORDER':
      return {...state, order: action.data, orderCompleted: true};

    case 'GET_ICON_PARTS':
      return {...state, icon_parts: action.data};

    case 'REMOVED_ICON':
    case 'UPLOADED_ICON':
      return update(state, {
        icon_parts: {
          [action.data["updated_key"]]: {$set: action.data["updated_value"]}
        }
      })

    default:
      return state;
  }
}