<template>
  <div class="Blog container">
    <h1>{{blog.blog.title}}</h1>
    <p>{{blog.blog.body}}</p>
    <form class="form text-center" @submit.prevent="editActiveBlog()">
      <textarea
        type="string"
        id="body"
        placeholder="body"
        rows="3"
        v-model="editBlog.body"
        required
      />
      <button type="submit" class="btn btn-warning color-white">edit blog</button>
    </form>

    <router-link :to="{ name: 'Home' }">
      <button @click="deleteBlog(ActiveBlogId)" class="btn btn-danger color-white">delete blog</button>
    </router-link>
    <div class="col-12">
      <form class="form text-center" @submit.prevent="createComment">
        <div class="form-group">
          <input
            type="string"
            id="comment"
            placeholder=" add comment"
            v-model="newComment.body"
            required
          />
          <button type="submit" class="btn btn-primary color-white">+</button>
        </div>
      </form>
    </div>
    <div class="row">
      <div v-for="comment in comments" :key="comment.id" class="card col-12 my-2 mx-auto">
        <h4>{{comment.body}}</h4>
        <p>{{comment.creatorEmail}}</p>
        <button @click="deleteComment(comment.id)" class="btn btn-danger color-white">delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog",
  mounted() {
    this.$store.dispatch("getBlogById", this.$route.params.id);
    this.$store.dispatch("getCommentsByBlogId", this.$route.params.id);
  },
  data() {
    return {
      newComment: {
        body: "",
        blogId: this.$store.state.activeBlog.blog.id
      },
      editBlog: {
        body: "",
        id: this.$store.state.activeBlog.blog.id
      }
    };
  },
  computed: {
    blog() {
      return this.$store.state.activeBlog;
    },
    ActiveBlogId() {
      return this.$store.state.activeBlog.blog.id;
    },
    comments() {
      return this.$store.state.activeComments;
    }
  },
  methods: {
    createComment() {
      this.$store.dispatch("createComment", { ...this.newComment });
      this.newComment = {
        body: "",
        blogId: this.$store.state.activeBlog.blog.id
      };
    },
    editActiveBlog() {
      this.$store.dispatch("editActiveBlog", this.editBlog);
    },
    deleteBlog(id) {
      this.$store.dispatch("deleteBlog", id);
    },
    deleteComment(id) {
      this.$store.dispatch("deleteComment", id);
    }
  }
};
</script>