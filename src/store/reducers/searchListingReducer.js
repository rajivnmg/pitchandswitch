import * as ActionTypes from "../actionTypes";
const initialState = {
	category_id: null,
	categoryName: null,
	latitude: null,
	longitude: null
};
const searchListingReducer = (state = initialState, action) => {
  switch (action.type) {
	case ActionTypes.SEARCH_LISTING_SET_CATEGORY:
		localStorage.setItem('categoryId', action.payload.categoryId);
      return { ...state, category_id: action.payload.categoryId, categoryName: action.payload.categoryName };
    default:
		return state;
  }  
};
export default searchListingReducer;
