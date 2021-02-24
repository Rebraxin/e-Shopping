import { PRODUCT_LIST_REQUEST } from '../constants/productConstants'
import { PRODUCT_LIST_SUCCESS } from '../constants/productConstants'
import { PRODUCT_LIST_FAIL } from '../constants/productConstants'
import { PRODUCT_DETAILS_REQUEST } from '../constants/productConstants'
import { PRODUCT_DETAILS_SUCCESS } from '../constants/productConstants'
import { PRODUCT_DETAILS_FAIL } from '../constants/productConstants'

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}