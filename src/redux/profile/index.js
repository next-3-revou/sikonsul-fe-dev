const initialState = {
  profile: {
    id: "",
    name: "",
    email: "",
    nik: "",
    occupation: "",
    isPremium: false,
    profilePictureUrl: null,
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_PICTURE":
      return {
        ...state,
        profile: {
          ...state.profile,
          profilePictureUrl: action.payload,
        },
      };

    case "ADD_PROFILE":
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
          profilePictureUrl: action.payload.profilePictureUrl,
        },
      };

    case "CLEAR_PROFILE":
      return {
        ...state,
        profile: {
          id: "",
          name: "",
          email: "",
          nik: "",
          occupation: "",
          isPremium: false,
          profilePictureUrl: null,
        },
      };

    default:
      return {
        ...state,
      };
  }
};

export default profileReducer;
