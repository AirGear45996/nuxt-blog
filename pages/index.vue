<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <Post v-for="post in posts" :post="post" :key="post._id"/>
    </el-col>
  </el-row>
</template>

<script>
export default {
  head: {
    title: `Главная | ${process.env.appName}`
  },
  async asyncData({store}) {
    const posts = await store.dispatch('post/fetch');
    return {posts};

  }
}
</script>

<style>

</style>
