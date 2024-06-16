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

export default getRoads;