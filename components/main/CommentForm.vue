<template>
    <div>
        <h1>Добавить комментарий:</h1>
        <el-form @submit.prevent.native="submitForm('ruleForm')"
                :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
            <el-form-item label="Ваше имя" prop="name">
                <el-input v-model="ruleForm.name"/>
            </el-form-item>
            <el-form-item label="Текс сообщения" prop="text">
                <el-input type="textarea" :rows="4" v-model="ruleForm.text"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" round :loading="loading">Отправить</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: [ 'postId' ],
        data: () => ({
            loading: false,
            ruleForm: {
                name: '',
                text: ''
            },
            rules: {
                name: [
                    { required: true, message: 'Имя не должно быть пустым', trigger: 'blur' },
                    { min: 3, max: 99, message: 'Length should be 3 to 5', trigger: 'blur' }
                ],
                text: [
                    { required: true, message: 'Введит комментарий', trigger: 'blur' }
                ]
            }
        }),
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.loading = true;

                        const data = {
                            postId: this.postId,
                            name: this.ruleForm.name,
                            text: this.ruleForm.text
                        };

                        try {

                            const newComment = await this.$store.dispatch('comment/create',data);
                            this.$emit('created',newComment);
                            this.$message.success('Комментарий добавлен');

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

</style>