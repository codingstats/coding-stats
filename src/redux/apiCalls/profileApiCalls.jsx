import axios from "axios";
import { profileFailure, profileStart, profileSuccess } from "../profileSlice";
import { publicRequest } from "../../requestMethods";

export const getProfile = async (dispatch) => {
  dispatch(profileStart());
  try {
    const res = await publicRequest.get("/users/profile");
    dispatch(
      profileSuccess({
        user: res.data.data.user,
      })
    );
  } catch (error) {
    dispatch(profileFailure());
  }
};
export const getPlatforms = async (dispatch) => {
  dispatch(profileStart());
  try {
    const res1 = await publicRequest.get("/users/platform1");
    const res2 = await publicRequest.get("/users/platform2");
    const res3 = await publicRequest.get("/users/platform1");
    const platforms = [res1, res2, res3];
    dispatch(
      platformFetchSuccess({
        platforms: platforms,
      })
    );
  } catch (error) {
    dispatch(profileFailure());
  }
};
