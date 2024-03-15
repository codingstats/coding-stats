import {
  heatmapsFetchSuccess,
  platformsFetchSuccess,
  searchFailure,
  searchStart,
  searchSuccess,
} from "../searchSlice";
import { publicRequest } from "../../requestMethods";

export const getSearchedProfile = async (dispatch, user) => {
  dispatch(searchStart());
  try {
    const res = await publicRequest.get(`/user/profile/${user}`);
    dispatch(
      searchSuccess({
        user: res.data.data.user,
      })
    );
  } catch (error) {
    dispatch(searchFailure());
  }
};

export const getSearchedPlatforms = async (dispatch, platforms) => {
  dispatch(searchStart());
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
    dispatch(searchFailure());
  }
};

export const getSearchedHeatmaps = async (dispatch, platforms) => {
  dispatch(searchStart());
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
    dispatch(searchFailure());
  }
};
