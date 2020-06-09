<template>
  <div class="home-container">
    <div class="row">
      <div class="col text-center justify-content-center">
        <h1>Welcome</h1>
        <form class="form text-center" @submit.prevent="createBlog">
          <div class="form-group">
            <div class="row">
              <div class="col-12">
                <input
                  type="string"
                  id="title"
                  placeholder="title"
                  v-model="newBlog.title"
                  required
                />
              </div>
              <div class="col">
                <textarea
                  type="string"
                  id="body"
                  placeholder="body"
                  rows="3"
                  v-model="newBlog.body"
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-success color-white">Create Blog</button>
        </form>
      </div>
    </div>
    <div class="row my-2 justify-content-center">
      <div v-for="blog in blogs" :key="blog.id" class="card col-4 my-2 mx-5">
        <router-link :to="{name:'Blog', params: {id: blog.id}}">
          <div class="card-body">
            <h4 class="card-title">{{blog.title}}</h4>
            <p class="card-text">{{blog.creatorEmail}}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getBlogs");
  },
  data() {
    return {
      newBlog: {}
    };
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    }
  },
  methods: {
    createBlog() {
      this.$store.dispatch("createBlog", { ...this.newBlog });
      this.newBlog = {};
    }
  }
};
</script>
<style scoped>
</style>
