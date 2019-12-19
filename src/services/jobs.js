import api from './index';
import URL from '../constants/url';

export default {
  getRecruiterListing: userId =>
    api().get(URL.buildUrl('GET_RECRUITER_LISTING', { userId })),
  addJobPost: (userId, payload) =>
    api().post(URL.buildUrl('ADD_JOB_POST', { userId }), payload),
  editJobPost: (userId, postId, payload) =>
    api().put(URL.buildUrl('UPDATE_JOB_POST', { userId, postId }), payload),
  getJobListing: userId => api().get(URL.buildUrl('GET_JOB_LIST', { userId })),
  addJobApplication: (userId, payload) =>
    api().post(URL.buildUrl('ADD_JOB_APPLICATION', { userId }), payload),
  getAppliedJobs: userId =>
    api().get(URL.buildUrl('GET_APPLIED_JOBS', { userId })),
  getJobApplicants: jobId =>
    api().get(URL.buildUrl('GET_JOB_APPLICANTS', { jobId }))
};
