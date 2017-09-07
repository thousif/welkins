import { combineReducers } from "redux"

import login from "./loginReducer"
import promo from "./promoReducer"
import notifier from "./notifier"

export default combineReducers({
  login,promo,notifier
})
