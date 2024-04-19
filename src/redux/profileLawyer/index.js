const initialState = {
  profileLawyer: {
    id: '',
    name: '',
    email: '',
    nik: '',  
    university: '',
    description: '',  
    alumnus: '',  
    strnumber: '',
    experience: '',
    specialization: []
  }

};

const profileLawyerReducer = (state = initialState, action) => {
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
          university: action.payload.university,
          description: action.payload.description,
          alumnus: action.payload.alumnus,
          strnumber: action.payload.strnumber,
          experience: action.payload.experience,
          specialization: action.payload.specialization,
        },
      };

    case 'CLEAR_PROFILE':
      return {
        ...state
      }
      
    default:
      return {
        ...state
      }
  }
};

export default profileLawyerReducer;