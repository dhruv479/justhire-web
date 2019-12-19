<template>
  <div>
    <div class="listing-card">
      <div v-if="filteredJobs.length===0">
        <h3>No Jobs Available, Please try after sometime!</h3>
      </div>
      <div class="job-card" v-for="post in filteredJobs" :key="post._id">
        <div class="flex-align">
          <div v-text="post.title" class="job-title" />
          <button
            v-if="post.applied !== true"
            type="button"
            @click="handleApplication(post)"
            class="btn btn-primary"
          >Apply</button>
          <button v-else type="button" disabled class="btn btn-outline-primary">Applied</button>
        </div>
        <div class="job-description" v-text="post.description" />
        <span class="recruiter-info">
          Posted by:
          {{ post.recruiterId.name + ' @ ' + post.recruiterId.company }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'JobListing',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      jobListing: 'getJobList',
      appliedJobs: 'getAppliedJobs'
    }),
    filteredJobs: {
      get: function() {
        let applied = this.appliedJobs.map(applied => {
          return applied.jobId;
        });
        return this.jobListing.map(job => {
          if (applied.indexOf(job._id) > -1) {
            return {...job, applied: true};
          }
          return job;
        });
      }
    }
  },
  mounted() {
    this.$store.dispatch('getAppliedJobs');
  },
  created() {
    this.$store.dispatch('getJobListing');
  },
  methods: {
    handleApplication(post) {
      this.$store.dispatch('addJobApplication', post);
    }
  }
};
</script>

<style scoped>
.add-modal {
  width: 400px;
}
label {
  width: 90%;
}
.listing-card {
  margin: 110px 100px 50px;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  width: 85%;
  padding: 40px 40px 10px 40px;
}
.job-card {
  background: rgba(129, 134, 163, 0.05);
  border-radius: 8px;
  min-height: 140px;
  margin-bottom: 40px;
}
.job-title {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5em;
  display: inline-block;
  color: #222222;
}
.flex-align {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px 0 20px;
}
.job-description {
  padding: 10px 20px;
  color: #555555;
}
.recruiter-info {
  padding: 10px 20px;
  color: #333333;
  font-size: 0.9em;
}
</style>
