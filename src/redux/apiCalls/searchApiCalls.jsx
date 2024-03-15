import {
  platformFetchSuccess,
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

export const getSearchedPlatforms = async (dispatch, platformList) => {
  dispatch(searchStart());
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
    dispatch(searchFailure());
  }
};
