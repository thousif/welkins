export default function reducer(state={
    data:{
        group : {},
        plugins : {},
        ready : false,
        success : false,
        promos : [],
        currentPromo : {}
    },
    fgd_loading: false,
    lp_loading : false,
    loading : false,
    error: null,
    logout : false,
  }, action) {
    switch (action.type) {
      case "FETCH_GROUP_DETAILS": {
        return {...state,
            loading: true
          }
      }
      case "FETCH_GROUP_DETAILS_REJECTED": {
        return {...state, loading: false, error: action.payload}
      }
      case "FETCH_GROUP_DETAILS_FULFILLED": {
        return {
          ...state,
          data : {...state.data,
            group : action.payload.data.group,
            plugins : action.payload.data.plugins,
            ready : true
          },
          loading: false,
        }
      }
      case "CREATE_PROMO":{
        return {...state,
          loading : true
        }
      }
      case "CREATE_PROMO_FULFILLED":{
        return {...state,
          data : {...state.data,
            success : true
          },
          loading : false
        }
      }
      case "CREATE_PROMO_REJECTED":{
        return {...state,
          loading : false
        }
      }
      case "EDIT_PROMO":{
        return {...state,
          loading : true
        }
      }
      case "EDIT_PROMO_FULFILLED":{
        return {...state,
          data : {...state.data,
            success : true
          },
          loading : false
        }
      }
      case "EDIT_PROMO_REJECTED":{
        return {...state,
          loading : false
        }
      }
      case "LIST_PROMO":{
        return {...state,
          lp_loading : true
        }
      }
      case "LIST_PROMO_FULFILLED":{
        return {...state,
          data : {...state.data,
            promos : action.payload.data.promo_codes,
            group : action.payload.data.group,
            plugins : action.payload.data.plugins
          },
          lp_loading : false
        }
      }
      case "LIST_PROMO_REJECTED":{
        return {...state,
          lp_loading : false
        }
      }
      case "FETCH_PROMO":{
        return {...state,
          loading : true
        }
      }
      case "FETCH_PROMO_FULFILLED":{
        return {...state,
          data : {...state.data,
            plugins : action.payload.data.plugins,
            currentPromo : action.payload.data.promo_obj
          },
          loading : false
        }
      }
      case "FETCH_PROMO_REJECTED":{
          return {...state,
            loading : false
        }
      }
      case "RESET_PROMO_STATE":{
        return {...state,
          data : {...state.data,
            success : false,
            ready : false
          }
        }
      }
      case "LOGOUT":{
        return{...state,
          data: {
            group : {},
            plugins : {},
            ready : false,
            success : false,
            promos : [],
            currentPromo : {}
          },
          fgd_loading: false,
          lp_loading : false,
          loading : false,
        }
      }
    }
    return state
}
