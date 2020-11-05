<template>
    <div>
        <el-table
                :data="posts"
                style="width: 100%">

            <el-table-column prop="title" label="Название"/>
            <el-table-column label="Дата" width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date | date }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="views" label="Просмотры">
                <template slot-scope="scope">
                    <i class="el-icon-view"></i>
                    <span style="margin-left: 10px">{{ scope.row.views }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Комментариев">
                <template slot-scope="scope">
                    <i class="el-icon-message"></i>
                    <span style="margin-left: 10px">{{ scope.row.comments.length }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="Действия">
                <template slot-scope="scope">

                    <el-tooltip effect="dark" content="Редактировать пост" placement="top">
                        <el-button
                                icon="el-icon-edit"
                                type="primary"
                                circle
                                @click="open(scope.row._id)"></el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="Удалить пост" placement="top">
                        <el-button
                                icon="el-icon-delete"
                                type="danger"
                                circle
                                @click="del(scope.row._id)"></el-button>
                    </el-tooltip>

                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        head: {
            title: `Список постов | ${process.env.appName}`
        },
        layout: 'admin',
        async asyncData({store}) {
            const posts = await store.dispatch('post/fetch');
            return {posts};
        },
        methods: {
            open(id) {
                this.$router.push(`/admin/post/${id}`);
            },
            async del(id) {
                try {

                    await this.$confirm('Вы действительно хотите удалить пост?', 'Внимание!', {
                        confirmButtonText: 'Да',
                        cancelButtonText: 'Нет',
                        type: 'warning'
                    });
                    
                    this.$store.dispatch('post/delete',id);
                    this.posts = this.posts.filter(p => p._id !== id);

                    this.$message({
                        type: 'success',
                        message: 'Удаление завершено'
                    });

                } catch (e) {
                    console.log('e: ', e);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>