
export function clearNotification(){
  return function(dispatch){
    dispatch({type : "CLEAR_NOTIFICATIONS"});
  }
}
