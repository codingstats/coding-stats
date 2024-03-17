import {
  clearsearch,
  heatmapsFetchSuccess,
  platformsFetchSuccess,
  searchFailure,
  searchStart,
  searchSuccess,
} from "../searchSlice";
import { publicRequest } from "../../requestMethods";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const getSearchedProfile = async (dispatch, user) => {
  dispatch(searchStart());
  toast("Searching Profile!");
  try {
    const res = await publicRequest.get(`/user/profile/${user}`);
    dispatch(
      searchSuccess({
        user: res.data.data.user,
      })
    );
    return res;
  } catch (error) {
    toast("User not Found!");
    dispatch(searchFailure());
    dispatch(clearsearch());
    return error;
  }
};

export const getSearchedPlatforms = async (dispatch, platforms) => {
  dispatch(searchStart());
  toast("Fetching User Details");
  try {
    const payload = [];
    await platforms.forEach(async (platform) => {
      try {
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
      } catch (error) {
        toast("Unable to fetch user details");
      }
    });
  } catch (error) {
    toast(`${error.message}`);
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
    toast("Unable to fetch user details");
    dispatch(searchFailure());
  }
};
