import Vue from 'vue';
import Router from 'vue-router';

import AppHome from '@/components/AppHome';
import JobListing from '@/components/JobListing';
import RecruitListing from '@/components/RecruitListing';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'exact-active active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: AppHome,
      meta: {
        title: 'JustHire | Home'
      }
    },
    {
      path: '/jobs',
      name: 'JobListing',
      component: JobListing,
      meta: {
        title: 'JustHire | Jobs'
      }
    },
    {
      path: '/recruit',
      name: 'Recruiter',
      component: RecruitListing,
      meta: {
        title: 'JustHire | Recruit'
      }
    }
  ]
});
