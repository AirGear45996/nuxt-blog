<template>
    <div class="page-wrap">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item to="/admin/post/list">Посты</el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ post.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-form @submit.prevent.native="submitForm('ruleForm')"
                 :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="Текст в формате .md или .html" prop="text">
                <el-input v-model="ruleForm.text" type="textarea" resize="none" :rows="10"/>
            </el-form-item>
            <div class="mb">
                <small>
                    <i class="el-icon-time"></i>
                    <span>{{ post.date.toLocaleString() }}</span>
                </small>
                <small style="margin-left: 2rem">
                    <i class="el-icon-view"></i>
                    <span >{{ post.views }}</span>
                </small>
            </div>
            <el-form-item>
                <el-button type="primary" native-type="submit" round :loading="loading">Обновить</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        layout: 'admin',
        validate({params}) {
            return Boolean(params.id)
        },
        head() {
            return {
                title: `${this.post.title} | ${process.env.appName}`
            }
        },
        async asyncData({store,params}) {
            const post = await store.dispatch('post/fetchById', params.id);
            return {post};
        },
        mounted() {
            this.ruleForm.text = this.post.text;
        },
        data: () => ({
            loading: false,
            ruleForm: {
                text: '',
            },
            rules: {
                text: [
                    { required: true, message: 'Текст не должен быть пустым', trigger: 'blur' },
                ],
            }
        }),
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.loading = true;
                        try {
                            const data = {
                                id: this.post._id,
                                text: this.ruleForm.text,
                            };

                            await this.$store.dispatch('post/update',data);
                            this.$message.success('Пост обновлён');

                            //this.$router.push('/admin')

                            this.loading = false;

                        } catch (e) {
                            console.log('e: ', e);
                            this.loading = false;
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-wrap {
        width: 800px;
    }
    .mb {
        margin-bottom: 1rem;
    }
</style>