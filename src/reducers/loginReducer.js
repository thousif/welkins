export default function reducer(state={
    user: {
      logged : false,
      logging : true,
      logout : true
    },
    fetching: false,
    fetched: false,
    error: null,
  }, action) {
    switch (action.type) {
      case "LOGIN_USER": {
        return {...state,
            user : { ...state.user, logging : true}, 
            fetching: true
          }
      }
      case "LOGIN_USER_REJECTED": {
        return {...state, fetching: false, error: "invalid username or password"}
      }
      case "LOGIN_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: { ...state.user, logging : false, logged : true, logout : false}, 
        }
      }
      case "LOGOUT":{
        console.log("logging out");
        return {
          ...state,
          user : {...state.user,logging:true,logged:false,logout : true}
        }
      }
    }

    return state
}
