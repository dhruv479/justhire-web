<template>
  <div>
    <HeaderHome />
    <div class="listing-card">
      <div class="job-card" v-for="post in jobListing" :key="post._id">
        <div class="flex-align">
          <div v-text="post.title" class="job-title" />
          <button
            v-if="post.applied !== true"
            type="button"
            @click="handleApplication(post)"
            class="btn btn-primary"
          >
            Apply
          </button>
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
import { mapGetters } from 'vuex';
import HeaderHome from './headers/HeaderHome';

export default {
  name: 'JobListing',
  components: { HeaderHome },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      jobListing: 'getJobList',
      appliedJobs: 'getAppliedJobs'
    })
  },
  watch: {
    jobListing: function() {
      for (let i = 0; i < this.appliedJobs.length; i++) {
        for (let j = 0; j < this.jobListing.length; j++) {
          if (this.appliedJobs[i].jobId === this.jobListing[j]._id) {
            this.jobListing[j].applied = true;
          }
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('getJobListing');
  },
  created() {
    this.$store.dispatch('getAppliedJobs');
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
  margin: 45px 100px;
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
