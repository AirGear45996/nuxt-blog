<template>
    <article class="post">
        <el-card shadow="hover" :body-style="{ padding: 0 }">
            <header class="post-header" slot="header">
                <h3>{{ post.title }}</h3>
                <small>
                    <i class="el-icon-time"></i>
                    {{ post.date | date('date') }}
                </small>
            </header>
            <div class="post-body">
                <img :src="post.imageUrl"
                     alt="post-img"
                     class="post-img">
            </div>
            <div class="post-footer">
                <el-button round @click.prevent="openPost(post._id)">Открыть</el-button>
                <span>
                    <i class="el-icon-message"></i>
                    {{ post.comments.length }}
                </span>
            </div>
        </el-card>
    </article>
</template>

<script>
    export default {
        props: [ 'post' ],
        methods: {
            openPost(id) {
                this.$router.push('/post/' + id);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .post {
        margin-bottom: 1.5rem;
        &-header {
            display: flex;
            justify-content: space-between; // разнести элементы по сторонам
            align-items: center; // выравнивание по центру
        }
        &-body {
            
        }
        &-img {
            width: 100%;
            height: auto;
        }
        &-footer {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>