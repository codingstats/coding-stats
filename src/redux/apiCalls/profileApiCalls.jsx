import {
  platformFetchSuccess,
  platformSetSuccess,
  profileFailure,
  profileStart,
  profileSuccess,
} from "../profileSlice";
import { publicRequest, userRequest } from "../../requestMethods";

export const getProfile = async (dispatch, user) => {
  dispatch(profileStart());
  try {
    const res = await userRequest.get(`/user/profile/${user}`);
    dispatch(
      profileSuccess({
        user: res.data.data.user,
      })
    );
  } catch (error) {
    dispatch(profileFailure());
  }
};

export const setPlatform = async (dispatch, platform, user) => {
  dispatch(profileStart());
  try {
    await userRequest.post("/user/addCodingPlatform", platform);
    await dispatch(platformSetSuccess());
    await getProfile(dispatch, user);
  } catch (error) {
    dispatch(profileFailure());
  }
};

export const getPlatforms = async (dispatch, platformList) => {
  dispatch(profileStart());
  try {
    const platforms = [];
    platformList.forEach(async (platform) => {
      const res = await publicRequest.get(
        `/${platform.platformName.toLowerCase()}/userdetails/${
          platform.platformHandler
        }`
      );
      platforms.push(res);
    });
    dispatch(
      platformFetchSuccess({
        platforms: platforms,
      })
    );
  } catch (error) {
    dispatch(profileFailure());
  }
};
