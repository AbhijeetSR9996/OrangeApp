import {
  FORGET_PASSWORD,
  GET_ALL_CITIES,
  GET_ALL_COUNTRY,
  GET_ALL_STATE,
  GET_USER_PROFILE,
  OTP_VERIFICATION,
  RESET_PASSWORD,
  UPDATE_USER_PROFILE,
  VALIDATE_LOGIN,
  VALIDATE_SIGNUP,
  VERIFY_QR,
  UPDATE_PROFILE_PIC,
  UPDATE_PROFILE_IMAGE,
} from './API_service';

export const validateLogin = async data => {
  try {
    const response = await VALIDATE_LOGIN(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getAllCountry = async () => {
  try {
    const response = await GET_ALL_COUNTRY();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getAllState = async id => {
  try {
    const response = await GET_ALL_STATE(id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const getAllCities = async id => {
  try {
    const response = await GET_ALL_CITIES(id);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const validateSignUP = async data => {
  try {
    const response = await VALIDATE_SIGNUP(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const forgetPassword = async data => {
  try {
    const response = await FORGET_PASSWORD(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const otpVerification = async data => {
  try {
    const response = await OTP_VERIFICATION(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const resetPassword = async data => {
  try {
    const response = await RESET_PASSWORD(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};
export const getUserProfile = async () => {
  try {
    const response = await GET_USER_PROFILE();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const updateUserProfile = async data => {
  try {
    const response = await UPDATE_USER_PROFILE(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const verifyQR = async data => {
  try {
    const response = await VERIFY_QR(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};

export const updateProfileImage = async (data) => {
  try {
    const response = await UPDATE_PROFILE_IMAGE(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};
