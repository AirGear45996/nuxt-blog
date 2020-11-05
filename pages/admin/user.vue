<template>
    <div class="main">


        <!--<pre>
            {{ users }}
        </pre>

        <hr>-->

        <el-table :data="users" style="width: 100%">

            <el-table-column prop="id" label="ID"/>
            <el-table-column prop="full_name" label="Логин"/>
            <el-table-column prop="highlight" label="Тип"/>
            <el-table-column label="Действия">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" type="primary" circle @click="open(scope.row.id)"></el-button>
                    <el-button icon="el-icon-delete" type="danger" circle @click="del(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="text-align: center; padding-top: 1.5rem;">
            <el-button icon="el-icon-circle-plus-outline" type="success" circle @click="add"></el-button>
        </div>

        <el-dialog title="Добавление нового пользователя" :visible.sync="formAddUser">
            <el-form @submit.prevent.native="submitForm('ruleForm')"
                     :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
                <el-form-item label="Логин" prop="login">
                    <el-input v-model="ruleForm.login"/>
                </el-form-item>
                <el-form-item label="Пароль" prop="password">
                    <el-input v-model="ruleForm.password" type="password"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit" round :loading="loading">Создать</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        head: {
            title: `Создать пользователя | ${process.env.appName}`
        },
        layout: 'admin',
        data: () => ({
            formAddUser: false,
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
        computed: {
            users() {
                return this.$store.getters['user/list']
            }
        },
        /*async fetch({store}) {
            if(store.getters['user/list'].length === 0) {
                await store.dispatch('user/fetch')
            }
        },*/
        methods: {
            add() {
                this.formAddUser = true;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.loading = true;
                        try {

                            const data = {
                                login: this.ruleForm.login,
                                password: this.ruleForm.password
                            };
                            
                            const res = await this.$store.dispatch('auth/create',data);
                            if(res) {
                                this.$message.success('Новый пользователь добавлен');
                                this.ruleForm.login = this.ruleForm.password = '';
                            }

                            this.formAddUser = false;
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
    .main {
        width: 900px;
    }
</style>