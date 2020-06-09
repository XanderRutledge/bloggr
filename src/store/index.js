import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    activeBlog: {},
    comments: [],
    activeComments: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBlogs(state, data) {
      state.blogs = data
    },
    addBlog(state, data) {
      state.blogs.push(data)
    },
    addComment(state, data) {
      state.comments.push(data)
    },
    setActiveBlog(state, data) {
      state.activeBlog = data
    },
    setActiveComments(state, data) {
      state.activeComments = data
    },
    removeBlog(state, id) {
      state.removeBlog = state.blogs.splice(b => b.id == id)
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBlogs({ commit, dispatch }) {
      try {
        let res = await api.get('blogs')
        commit("setBlogs", res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async getBlogById({ commit, dispatch }, id) {
      try {
        let res = await api.get('blogs/' + id)
        commit("setActiveBlog", res.data.blog)
      } catch (error) {
        console.error(error)
      }

    },

    async createBlog({ commit, dispatch }, data) {
      try {
        let res = await api.post('blogs', data)
        commit("addBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async createComment({ commit, dispatch }, data) {
      try {
        let res = await api.post('comments', data)
        commit("addComment", res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async getCommentsByBlogId({ commit, dispatch }, id) {
      try {
        let res = await api.get('blogs/' + id)
        commit("setActiveComments", res.data.comments)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteBlog({ commit, dispatch }, id) {
      try {
        let res = await api.delete('blogs/' + id);
        commit("removeBlog", id)
      } catch (error) {
        console.error(error)
      }
    },
    async editActiveBlog({ commit, dispatch }, editBlog) {
      try {
        let res = await api.put('blogs/' + editBlog.id, editBlog)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteComment({ commit, dispatch }, id) {
      try {
        let res = await api.delete('comments/' + id);
      } catch (error) {
        console.error(error)
      }
    },
  },
});
