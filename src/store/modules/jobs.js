/* eslint-disable no-empty-pattern */
import Vue from 'vue';
import JobService from '@/services/jobs';
import utils from '../../utils';

export const jobs = {
  state: {
    recruiterListing: [],
    jobListing: [],
    appliedJobs: [],
    jobApplicants: []
  },
  getters: {
    getRecruiterList: state => state.recruiterListing,
    getJobList: state => state.jobListing,
    getAppliedJobs: state => state.appliedJobs,
    getJobApplicants: state => state.jobApplicants
  },
  mutations: {
    setRecruiterListing: (state, value) => {
      state.recruiterListing = value;
    },
    addJobPost: (state, value) => {
      state.recruiterListing.push(value);
    },
    updateJobPost: (state, value) => {
      state.recruiterListing.map((post, index) => {
        if (post._id === value._id) {
          Vue.set(state.recruiterListing, index, value);
        }
      });
    },
    setJobListing: (state, value) => {
      state.jobListing = value;
    },
    setAppliedJobs: (state, value) => {
      state.appliedJobs = value;
    },
    setJobApplicants: (state, value) => {
      state.jobApplicants = value;
    },
    addApplication: (state, value) => {
      state.appliedJobs.push(value);
      // state.jobListing = state.jobListing.filter(job => {
      //   return job._id !== value.jobId;
      // });
    }
  },
  actions: {
    getRecruiterListing: ({commit}, userId = utils.getUserId()) => {
      JobService.getRecruiterListing(userId)
        .then(response => {
          commit('setRecruiterListing', response.data.data);
        })
        .catch(error => {
          Vue.$log.error(error);
        });
    },
    addJobPost: ({commit}, payload, userId = utils.getUserId()) => {
      JobService.addJobPost(userId, payload)
        .then(response => {
          commit('addJobPost', response.data.data);
          Vue.$toast.success(response.data.message);
        })
        .catch(error => {
          Vue.$log.error(error);
        });
    },
    editJobPost: ({commit}, payload, postId = payload._id, userId = utils.getUserId()) => {
      JobService.editJobPost(userId, postId, payload)
        .then(response => {
          commit('updateJobPost', response.data.data);
          Vue.$toast.success(response.data.message);
        })
        .catch(error => {
          Vue.$log.error(error);
        });
    },
    getJobListing: ({commit}, userId = utils.getUserId()) => {
      JobService.getJobListing(userId)
        .then(response => {
          commit('setJobListing', response.data.data);
        })
        .catch(error => {
          Vue.$log.error(error);
        });
    },
    addJobApplication: ({commit}, payload, userId = utils.getUserId()) => {
      JobService.addJobApplication(userId, payload)
        .then(response => {
          Vue.$toast.success(response.data.message);
          commit('addApplication', response.data.data);
        })
        .catch(error => {
          Vue.$log.error(error);
        });
    },
    getAppliedJobs: ({commit}, userId = utils.getUserId()) => {
      JobService.getAppliedJobs(userId)
        .then(response => {
          commit('setAppliedJobs', response.data.data);
        })
        .catch(error => {
          Vue.$log.error(error);
        });
    },
    getJobApplicants: ({commit}, jobId) => {
      JobService.getJobApplicants(jobId)
        .then(response => {
          commit('setJobApplicants', response.data.data);
        })
        .catch(error => {
          Vue.$log.error(error);
        });
    }
  }
};
