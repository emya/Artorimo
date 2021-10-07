export const orderIcon = (
  artist_id, face, face_filter,
  hair, hair_filter,
  bang, bang_filter,
  side, side_filter,
  eyes, eyes_filter,
  eyebrows, eyebrows_filter,
  nose,
  mouth, mouth_filter,
  cloth, cloth_filter,
) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({
      artist_id, face, face_filter,
      hair, hair_filter,
      bang, bang_filter,
      side, side_filter,
      eyes, eyes_filter,
      eyebrows, eyebrows_filter,
      nose,
      mouth, mouth_filter,
      cloth, cloth_filter,
    });

    return fetch("/api/order/icon/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: "ORDER_ICON", data: res.data });
          return res.data;
        } else {
          dispatch({type: "ORDER_ICON_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}

export const fetchOrder = order_id => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`/api/order/icon/${order_id}/`, {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: "FETCH_ORDER", data: res.data });
          return res.data;
        } else {
          dispatch({type: "FETCH_ORDER_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}

export const fetchIconParts = (artist_id, is_setup = false) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let params = `?artist_id=${artist_id}&is_setup=${is_setup}`;

    return fetch(`/api/icons/maker/${params}`, {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: "GET_ICON_PARTS", data: res.data });
          return res.data;
        } else {
          dispatch({type: "GET_ICON_PARTS_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}

export const uploadIconParts = (artist_id, icon_part, imageFiles) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const formData = new FormData();

    formData.append('artist_id', artist_id);
    formData.append('icon_part', icon_part);

    var j = 0;
    for (var i = 0; i < imageFiles.length; i++) {
      formData.append(`image${i}`, imageFiles[i]);
      j++;
    }

    return fetch('/api/setup/icons/maker/', {headers, method: "POST", body: formData})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: "UPLOADED_ICON", data: res.data });
          return res.data;
        } else {
          dispatch({type: "ORDER_ICON_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}

export const uploadPairedParts = (artist_id, icon_part, lineFile, fillingFile) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const formData = new FormData();

    formData.append('artist_id', artist_id);
    formData.append('icon_part', icon_part);

    formData.append('line_image', lineFile[0]);
    formData.append('filling_image', fillingFile[0]);

    return fetch('/api/setup/icons/maker/', {headers, method: "POST", body: formData})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: "UPLOADED_ICON", data: res.data });
          return res.data;
        } else {
          dispatch({type: "ORDER_ICON_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}


export const removeIconParts = (artist_id, icon_part, imageNumbers) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const formData = new FormData();

    formData.append('artist_id', artist_id);
    formData.append('icon_part', icon_part);
    formData.append('file_numbers', imageNumbers);
    formData.append('is_deleted', true);

    return fetch('/api/setup/icons/maker/', {headers, method: "POST", body: formData})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: "REMOVED_ICON", data: res.data });
          return res.data;
        } else {
          dispatch({type: "ORDER_ICON_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}

export const cleanupIconParts = (artist_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({
      artist_id
    })

    return fetch('/api/icons/maker/cleanup/', {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: "CLEANUP_ICON", data: res.data });
          return res.data;
        } else {
          dispatch({type: "CLEANUP_ICON_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}