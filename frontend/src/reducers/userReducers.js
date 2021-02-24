import { USER_LOGIN_REQUEST } from '../constants/userConstants'
import { USER_LOGIN_SUCCESS } from '../constants/userConstants'
import { USER_LOGIN_FAIL } from '../constants/userConstants'
import { USER_LOGOUT } from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
