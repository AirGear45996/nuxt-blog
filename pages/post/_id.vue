<template>
    <article class="post">
        <header class="post-header">
            <div class="post-title">
                <h1>{{ post.title }}</h1>
                <n-link to="/">
                    <i class="el-icon-back"></i>
                </n-link>
            </div>
            <div class="post-info">
                <i class="el-icon-time"></i>
                <small>{{ post.date | date }}</small>
                <small>
                    <i class="el-icon-view"></i>
                    {{ post.views }}
                </small>
            </div>
            <div class="post-img">
                <img :src="post.imageUrl" alt="post-img">
            </div>
        </header>
        <main class="post-content">
            <div v-html="$md.render(text)"></div>
        </main>
        <footer>
            <CommentForm v-if="canAddComment" @created="createComment" :postId="post._id"/>
            <div class="comments" v-if="post.comments.length">
                <Comment v-for="comment in post.comments" :key="comment._id" :comment="comment"/>
            </div>
            <div class="text-center" v-else>
                Комментариев нет
            </div>
        </footer>
    </article>
</template>

<script>
    export default {
        head() {
            return {
                title: `${this.post.title} | ${process.env.appName}`
            }
        },
        async asyncData({store,params}) {
            const post = await store.dispatch('post/fetchById', params.id);
            await store.dispatch('post/addView', { id: params.id, views: ++post.views });
            return {post};
        },
        data: () => ({
            canAddComment: true,
        }),
        computed: {
            text() {
                return this.post.text || '';
            }
        },
        methods: {
            createComment(newComment) {
                console.log('newComment: ', newComment);
                this.post.comments.push(newComment);
                this.canAddComment = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .post {
        max-width: 600px;
        margin: 0 auto;
        &-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        &-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: .5rem;
        }
        &-img img {
            width: 100%;
            height: auto;
        }
        &-header {
            margin-bottom: 1.5rem;
        }
        &-content {
            margin-bottom: 2rem;
        }
    }
</style>