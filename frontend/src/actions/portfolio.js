export const fetchPortfolio = userId => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`/api/portfolios/?userId=${userId}`, {headers, })
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
          return dispatch({type: 'FETCH_PORTFOLIO', portfolio: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const updatePortfolio = (
  id, img0, img1, img2, img3, img4, img5, img6, img7, img8
  ) => {
  return (dispatch, getState) => {
    const formData = new FormData();

    let headers = {};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    formData.append('image0', img0);
    formData.append('image1', img1);
    formData.append('image2', img2);
    formData.append('image3', img3);
    formData.append('image4', img4);
    formData.append('image5', img5);
    formData.append('image6', img6);
    formData.append('image7', img7);
    formData.append('image8', img8);

    return fetch(`/api/portfolios/${id}/`, {headers, method: "PATCH", body: formData})
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
          return dispatch({type: 'UPDATE_PORTFOLIO', portfolio: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

