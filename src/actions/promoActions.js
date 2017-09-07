import axios from "axios";
import Cookies from 'universal-cookie';
import * as constants from '../constants';

const cookies = new Cookies();

function removeCookies(){
  cookies.remove("ops_at");
  cookies.remove("ops_aid");
}

export function resetPromoState(){
  return function(dispatch){
    dispatch({type:"RESET_PROMO_STATE"});
  }
}

export function logout(){
  removeCookies();
  return function(dispatch){
    dispatch({type : "LOGOUT"})
  }
}

export function listPromos(data) {
  var listPromosConfig = {
    method: 'POST',
    url: constants.API_ENDPOINT+'/ops/ls',
    headers: {
        'x-ops-access-token' : cookies.get('ops_at')
    },
    data  : data
  };
  return function(dispatch) {
    dispatch({type:"LIST_PROMO"})
    axios(listPromosConfig).then((response) => {
        console.log(response);
        dispatch({type: "LIST_PROMO_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        if(err.response && err.response.status == 498){
          removeCookies();
          dispatch({type : "LOGOUT"})
          return
        }
        dispatch({type: "LIST_PROMO_REJECTED", payload: err})
      })
  }
}

export function getGroupDetails(data) {
  var getGroupDetailsConfig = {
    method: 'POST',
    url: constants.API_ENDPOINT+'/ops/g_grp_dt',
    headers: {
        'x-ops-access-token' : cookies.get('ops_at')
    },
    data: {
      code : data.gcode
    }
  };
  return function(dispatch) {
    dispatch({type: "FETCH_GROUP_DETAILS"})
    axios(getGroupDetailsConfig).then((response) => {
        console.log(response);
        dispatch({type: "FETCH_GROUP_DETAILS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        if(err.response && err.response.status == 498){
          removeCookies();
          dispatch({type : "LOGOUT"})
          return
        }
        dispatch({type: "FETCH_GROUP_DETAILS_REJECTED", payload: err})
      })
  }
}

export function fetchPromo(promo) {
  var fetchPromoConfig = {
    method: 'POST',
    url: constants.API_ENDPOINT+'/ops/lsi',
    headers: {
        'x-ops-access-token' : cookies.get('ops_at')
    },
    data: {
      promo_id : promo
    }
  };
  return function(dispatch) {
    dispatch({type:"FETCH_PROMO"})
    axios(fetchPromoConfig).then((response) => {
        console.log(response);
        dispatch({type: "FETCH_PROMO_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        if(err.response && err.response.status == 498){
          removeCookies();
          dispatch({type : "LOGOUT"})
          return
        }
        dispatch({type: "FETCH_PROMO_REJECTED", payload: err})
      })
  }
}

export function createPromo(data) {
  var createPromoConfig = {
    method: 'POST',
    url: constants.API_ENDPOINT+'/ops/cr_prmo',
    headers: {
        'x-ops-access-token' : cookies.get('ops_at')
    },
    data: data
  };
  return function(dispatch) {
    dispatch({type:"CREATE_PROMO"})
    axios(createPromoConfig).then((response) => {
        console.log(response);
        dispatch({type: "CREATE_PROMO_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        if(err.response && err.response.status == 498){
          removeCookies();
          dispatch({type : "LOGOUT"})
          return
        }
        dispatch({type: "CREATE_PROMO_REJECTED", payload: err})
      })
  }
}

export function editPromo(data) {
  var editPromoConfig = {
    method: 'POST',
    url: constants.API_ENDPOINT+'/ops/ed_prmo',
    headers: {
        'x-ops-access-token' : cookies.get('ops_at')
    },
    data: data
  };
  return function(dispatch) {
    dispatch({type:"EDIT_PROMO"})
    axios(editPromoConfig).then((response) => {
        console.log(response);
        dispatch({type: "EDIT_PROMO_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        console.log(err);
        if(err.response && err.response.status == 498){
          removeCookies();
          dispatch({type : "LOGOUT"})
          return
        }
        dispatch({type: "EDIT_PROMO_REJECTED", payload: err})
      })
  }
}