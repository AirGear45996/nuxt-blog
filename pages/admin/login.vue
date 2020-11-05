<template>
    <el-card
            shadow="always"
            :style="{width: '500px'}"
    >
        <h2>Вход</h2>
        <el-form @submit.prevent.native="submitForm('ruleForm')"
                 :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
            <el-form-item label="Логин" prop="login">
                <el-input v-model="ruleForm.login"/>
            </el-form-item>
            <el-form-item label="Пароль" prop="password">
                <el-input v-model="ruleForm.password" type="password"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" round :loading="loading">Войти</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        head: {
            title: `Вход в админку | ${process.env.appName}`
        },
        middleware: [],
        layout: 'empty',
        data: () => ({
            loading: false,
            ruleForm: {
                login: '',
                password: ''
            },
            rules: {
                login: [
                    { required: true, message: 'Введите логин', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Введит пароль', trigger: 'blur' },
                    { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur' }
                ]
            }
        }),
        mounted() {
            const {msg} = this.$route.query;

            switch (msg) {
                case 'logout':
                    this.$message.success('Вы успешно вышли из системы');
                    break;
                case 'session':
                    this.$message.warning('Время сессии истекло, пожалуйста зайдите заново');
                    break;
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.loading = true;
                        try {
                            const data = {
                                login: this.ruleForm.login,
                                password: this.ruleForm.password
                            };

                            if( await this.$store.dispatch('auth/login',data) ) {
                                await this.$router.push('/admin');
                            }

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
    h2 {
        text-align: center;
    }
</style>