import update from 'react-addons-update';

const initialState = {
  //{text: "Write code!"}
  isOrdered: null,
  isRemoved: null,
  isDownloadReady: null,
  orderCompleted: null,
  orderApproved: null,
  fetchFailed: null,
  uploadCompleted: null,
};

export default function payment(state=initialState, action) {
  //let profileList = state.slice();

  switch (action.type) {
    case 'ORDER_ICON':
      return {...state, order: action.data, isOrdered: true};

    case 'FETCH_ORDER':
      return {...state, order: action.data, orderCompleted: true};

    case 'FETCH_APPROVED_ORDER':
      return {...state, order: action.data, orderApproved: true};

    case 'FETCH_APPROVED_ORDER_FAILURE':
      return {...state, order: action.data, orderApproved: false};

    case 'COMPLETE_ICON_UPLOAD':
      return {...state, order: action.data, uploadCompleted: true};

    case 'COMPLETE_ICON_UPLOAD_FAILURE':
      return {...state, order: action.data, uploadCompleted: false};

    case 'FETCH_ORDER_FOR_DOWNLOAD':
      return {...state, order: action.data, isDownloadReady: true};

    case 'FETCH_ORDER_FOR_DOWNLOAD_FAILURE':
      return {...state, order: action.data, isDownloadReady: false};

    case 'GET_ICON_PARTS':
      return {...state, icon_parts: action.data};

    case 'GET_ICON_PARTS_FAILURE':
      return {...state, icon_parts: action.data, fetchFailed: true};


    case 'REMOVED_ICON':
      return update(state, {
        isRemoved: {$set: true},
        icon_parts: {
          [action.data["updated_key"]]: {$set: action.data["updated_value"]}
        }
      })

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