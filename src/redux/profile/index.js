const initialState = {
  profile: {
    id: '',
    name: '',
    email: '',
    nik: '',  
    occupation: '',
    isPremium: false
  }

};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PROFILE':
      return {
        ...state,
        profile: {
          ...state.profile,
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          nik: action.payload.NIK,
          occupation: action.payload.occupation,
          isPremium: action.payload.isPremium,
        },
      };

    case 'CLEAR_PROFILE':
      return {
        ...state,
        profile: {
          id: '',
          name: '',
          email: '',
          nik: '',  
          occupation: '',
          isPremium: false
        }
      }
      
    default:
      return {
        ...state,
        profile: {
          id: '',
          name: '',
          email: '',
          nik: '',  
          occupation: '',
          isPremium: false
        }
      }
  }
};

export default profileReducer;