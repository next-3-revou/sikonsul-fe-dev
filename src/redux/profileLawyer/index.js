const initialState = {
  profileLawyer: {
    id: '',
    name: '',
    email: '',
    nik: '',  
    university: '',
    description: '',  
    profile: []
  }

};

const profileLawyerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PROFILE_LAWYER':
      return {
        ...state,
        profileLawyer: {
          ...state.profileLawyer,
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          nik: action.payload.NIK,
          university: action.payload.university,
          description: action.payload.description,
          profile: action.payload.profile,
        },
      };

    case 'CLEAR_PROFILE_LAWYER':
      return {
        ...state,
        profileLawyer: {
          id: '',
          name: '',
          email: '',
          nik: '',  
          university: '',
          description: '',  
          profile: []
        }
      }
      
    default:
      return {
        ...state
      }
  }
};

export default profileLawyerReducer;