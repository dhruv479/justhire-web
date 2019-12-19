<template>
  <div>
    <HeaderHome />
    <!-- <button type="button" @click="openAddPost" class="btn btn-success">
      Add Post
    </button> -->
    <div class="listing-card">
      <div class="title">
        <h2>Job Posts</h2>
        <button
          type="button"
          @click="openAddPost"
          class="btn btn-outline-success"
        >
          Add Post
        </button>
      </div>
      <div class="job-card" v-for="post in recruiterListing" :key="post._id">
        <div class="flex-align">
          <div v-text="post.title" class="job-title" />
          <button
            type="button"
            @click="openPostEdit(post)"
            class="btn btn-primary"
          >
            Edit
          </button>
        </div>
        <div class="job-description" v-text="post.description" />
        <span class="applicant-info" @click="openApplicants(post._id)">
          Show Applicants
        </span>
      </div>
    </div>

    <!-- Modal for Adding New Post/ Editing Post -->
    <VuexplosionModal :visible="showAddPost" @close="closeAddPost">
      <div slot="title">
        <span v-if="modalPost._id">Edit Post</span>
        <span v-else>Add Job Post</span>
      </div>
      <div slot="body">
        <div class="add-modal">
          <form @submit="handleAddPost">
            <br />
            <label>
              Title:
              <input
                type="text"
                v-model="modalPost.title"
                class="form-control"
                required
              />
            </label>
            <label>
              Description:
              <textarea
                v-model="modalPost.description"
                class="form-control"
                required
                rows="8"
                cols="19"
              />
            </label>
            <br />
            <br />
            <div align="center">
              <button type="submit" class="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </VuexplosionModal>

    <!-- Modal for Adding New Post/ Editing Post -->
    <VuexplosionModal :visible="showApplicants" @close="closeApplicants">
      <div slot="title">
        Job Applicants
      </div>
      <div slot="body">
        <div class="add-modal">
          <table class="table">
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
            <tr v-for="application in jobApplicants" :key="application._id">
              <td v-text="application.candidateId.name"></td>
              <td v-text="application.candidateId.email"></td>
            </tr>
          </table>
        </div>
      </div>
    </VuexplosionModal>
  </div>
</template>

<script>
import VuexplosionModal from './custom/VueModal';
import HeaderHome from './headers/HeaderHome';
import { mapGetters } from 'vuex';

export default {
  name: 'RecruitListing',
  components: { VuexplosionModal, HeaderHome },
  data() {
    return {
      showAddPost: false,
      showApplicants: false,
      modalPost: {}
    };
  },
  computed: {
    ...mapGetters({
      recruiterListing: 'getRecruiterList',
      jobApplicants: 'getJobApplicants'
    })
  },
  mounted() {
    this.$store.dispatch('getRecruiterListing');
  },
  methods: {
    openAddPost() {
      this.showAddPost = !this.showAddPost;
    },
    closeAddPost() {
      this.showAddPost = false;
      this.modalPost = {};
    },
    handleAddPost(e) {
      e.preventDefault();
      if (this.modalPost._id) {
        this.$store.dispatch('editJobPost', this.modalPost);
      } else {
        this.$store.dispatch('addJobPost', this.modalPost);
      }
      this.closeAddPost();
    },
    openPostEdit(post) {
      this.modalPost = Object.assign({}, post);
      this.openAddPost();
    },
    openApplicants(jobId) {
      this.$store.dispatch('getJobApplicants', jobId);
      this.showApplicants = !this.showApplicants;
    },
    closeApplicants() {
      this.showApplicants = false;
      this.jobApplicants = [];
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
  font-size: 1.6em;
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
.applicant-info {
  padding: 10px 20px;
  color: #3161a8;
  font-size: 0.9em;
  cursor: pointer;
}
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
</style>
