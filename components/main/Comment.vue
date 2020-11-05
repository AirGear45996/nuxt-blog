<template>
    <el-card class="comment">
        <div class="comment-header">
            <span class="name">{{ comment.name }}</span>
            <small>
                <i class="el-icon-time"></i>
                {{ new Date(comment.date).toLocaleString() }}
            </small>
        </div>
        <div class="comment-text">
            {{ comment.text }}
        </div>
    </el-card>
</template>

<script>
    export default {
        props:['comment']
    }
</script>

<style lang="scss" scoped>
    .comment {
        margin-bottom: 1rem;
        &-header {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
        }
        &-text {
            white-space: pre-line;
        }
    }
</style>