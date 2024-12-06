import { API } from "../config/apiClient";
import { ApiEndPoint } from "../utils/apiEndpoints";

const { AUTH } = ApiEndPoint;

export const register = async (userData) => {
  try {
    const responce = await API.post(AUTH.REGISTER, userData);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } else {
      return;
    }
  }
};
export const login = async (userData) => {
  try {
    const responce = await API.post(AUTH.LOGIN, userData);
    return responce.data;
  } catch (errors) {
    if (errors.response) {
      const error = errors?.response?.data;
      return error;
    } else {
      return;
    }
  }
};
