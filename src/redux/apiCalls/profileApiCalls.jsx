import {
  platformsFetchSuccess,
  platformSetSuccess,
  profileFailure,
  profileStart,
  profileSuccess,
  heatmapsFetchSuccess,
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

export const getPlatforms = async (dispatch, platforms) => {
  dispatch(profileStart());
  try {
    const payload = [];
    await platforms.forEach(async (platform) => {
      const res = await publicRequest.get(
        `/${platform.platformName.toLowerCase()}/userdetails/${
          platform.platformHandler
        }`
      );

      payload.filter((obj) => obj.profileLink == res.data.data.profileLink)
        .length === 0;

      payload.push(res.data.data);

      if (payload.length === platforms.length) {
        dispatch(
          platformsFetchSuccess({
            platforms: payload,
          })
        );
      }
    });
  } catch (error) {
    dispatch(profileFailure());
  }
};

export const getHeatmaps = async (dispatch, platforms) => {
  dispatch(profileStart());
  try {
    const payload = [];
    await platforms.forEach(async (platform) => {
      const res = await publicRequest.post(
        `/${platform.platformName.toLowerCase()}/userHeatMap`,
        {
          username: platform.platformHandler,
          userid: platform.platformUserId,
          year: 2024,
        }
      );
      console.log(res.data.data);
      payload.filter((obj) => obj.profileLink == res.data.data.profileLink)
        .length === 0;
      payload.push(res.data.data);
      if (payload.length === platforms.length) {
        dispatch(
          heatmapsFetchSuccess({
            platforms: payload,
          })
        );
      }
    });
  } catch (error) {
    dispatch(profileFailure());
  }
};
