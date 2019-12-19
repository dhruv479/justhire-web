const uritemplate = require('uritemplate');

const API_BASE_URL = process.env.API_BASE_URL;

// above Can be done using axios also but kept here to future scope of multiple microservice baseurl

const makeQueryParam = (queryParamMap = {}) => {
  let string = '?';
  let paramList;
  let index;
  if (queryParamMap) {
    Object.keys(queryParamMap).forEach(key => {
      if (queryParamMap[key].constructor === Array) {
        paramList = queryParamMap[key];
        index = paramList.length;
        while (index) {
          index -= 1;
          string += `${key}[]=${paramList[index]}&`;
        }
      } else {
        string += `${key}=${queryParamMap[key]}&`;
      }
    });
  }
  return string;
};

export default {
  REGISTER_USER: `${API_BASE_URL}/user/auth`,
  LOGIN_USER: `${API_BASE_URL}/user/login`,
  GET_RECRUITER_LISTING: `${API_BASE_URL}/recruiter/{userId}/list`,
  ADD_JOB_POST: `${API_BASE_URL}/recruiter/{userId}/post`,
  UPDATE_JOB_POST: `${API_BASE_URL}/recruiter/{userId}/post/{postId}`,
  GET_JOB_LIST: `${API_BASE_URL}/seeker/{userId}`,
  ADD_JOB_APPLICATION: `${API_BASE_URL}/seeker/{userId}/apply`,
  GET_APPLIED_JOBS: `${API_BASE_URL}/seeker/{userId}/applications`,
  GET_JOB_APPLICANTS: `${API_BASE_URL}/recruiter/{jobId}/applicants`,
  buildUrl(urlName, params, queryParam) {
    return (
      uritemplate.parse(this[urlName]).expand(params) +
      makeQueryParam(queryParam)
    );
  }
};
