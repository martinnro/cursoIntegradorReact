const placesReducer = (state = [], action) => {
    console.log('Action:', action);
    switch (action.type) {
      case 'SET_PLACES':
        return action.payload;
  
      case 'ADD_PLACE':
        return [...state, action.payload];
  
      case 'UPDATE_PLACE':
        return state.map((place) =>
          place._id === action.payload._id ? action.payload : place
        );
  
      case 'DELETE_PLACE':
        return state.filter((place) => place._id !== action.payload);
  
      default:
        return state;
    }
  };
  
  export default placesReducer;
  