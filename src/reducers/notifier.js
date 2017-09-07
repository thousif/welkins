export default function reducer(state={
    data : {}
  }, action) {
    switch (action.type) {
      case "LOGIN_USER_REJECTED": {        
        return {
          data :{
            type : "error",
            title : "Error",
            message : "Invalid login credentials"
          }
        }
      }
      case "VERIFY_OTP_FULFILLED":{
        return {data :{
              type : "success",
              title : "Success",
              message : "Successfully logged in"
            }
        }
      }
      case "FETCH_GROUP_DETAILS_REJECTED": {
        if(action.payload.response.status == 400){
          return {data :{
              type : "error",
              title : "Error",
              message : "Invalid Group code"
            }
          }
        }
        return {data :{
              type : "error",
              title : "Error",
              message : "Please try again later"
            }
          }
      }
      case "CREATE_PROMO_FULFILLED":{
        return {data :{
              type : "success",
              title : "Success",
              message : "Successfully created promo code"
            }
          }
      }
      case "CREATE_PROMO_REJECTED":{
        console.log(action.payload.response);
        if(action.payload.response.status == 400){
          return {data :{
              type : "error",
              title : "Error creating promo code",
              message : "Invalid details"
            }
          }
        }
        if(action.payload.response.status == 449){
          return {data :{
              type : "error",
              title : "Error creating promo code",
              message : action.payload.response.data.message
            }
          } 
        }
        return {data :{
              type : "error",
              title : "Error creating promo code",
              message : "Please try again later"
            }
          }
      }
      case "EDIT_PROMO_FULFILLED":{
        return {data :{
              type : "success",
              title : "Success",
              message : "Successfully edited promo code"
            }
          }
      }
      case "EDIT_PROMO_REJECTED":{
        if(action.payload.response.status == 400){
          return {data :{
              type : "error",
              title : "Error editing promo details",
              message : "Invalid details"
            }
          }
        }
        return {data :{
              type : "error",
              title : "Error",
              message : "Please try again later"
            }
          }
      }
      case "LIST_PROMO_REJECTED":{
        if(action.payload.response.status == 400){
        return {data :{
              type : "error",
              title : "Error",
              message : "Invalid group code"
            }
          }
        }
        return {data :{
              type : "error",
              title : "Error",
              message : "Please try again later"
            }
          }
      }
      case "FETCH_PROMO_REJECTED":{
        return {data :{
              type : "error",
              title : "Error",
              message : "Please try again later"
            }
          }
      }
      case "CLEAR_NOTIFICATIONS":{
        return {...state, data : {}}
      }
    }

    return state
}
