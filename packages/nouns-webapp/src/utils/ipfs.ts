import axios from 'axios';

export const fetchFromIpfs = async (url: string) => {
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(e => {
      console.log({ e });
    });
};
