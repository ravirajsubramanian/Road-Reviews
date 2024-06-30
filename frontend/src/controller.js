import axios from './axios';

const getRoads = async () => {
  try {
    const roads = await axios.get(`/roads`);
    return roads;
  } catch (e) {
    const msg = e?.response?.error.message ?? e?.message ?? 'Unknown Error';
    console.error(msg);
    return false;
  }
};

const submitReview = async (road_id, rating, review) => {
  try {
    const response = await axios.post(`/roads/${road_id}/reviews`, {
      rating,
      review
    });
    console.log(response);
    return response;
  } catch (e) {
    const msg = e?.response?.error.message ?? e?.message ?? 'Unknown Error';
    console.error(msg);
    return false;
  }
};

export { getRoads, submitReview };