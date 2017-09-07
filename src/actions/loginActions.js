import axios from "axios";
import Cookies from 'universal-cookie';
import * as constants from '../constants';

const cookies = new Cookies();

export function loginUser(data) {
  return function(dispatch) {
    dispatch({type : "LOGIN_USER"});
    if(data.username == "guest" && data.password == "guest"){
      dispatch({type: "LOGIN_USER_FULFILLED"})
    } else {
      dispatch({type: "LOGIN_USER_REJECTED"})
    }      
  }
}

export function logout(){
  return function(dispatch){
    dispatch({type : "LOGOUT"})
  }
}