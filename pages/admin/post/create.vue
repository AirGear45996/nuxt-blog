<template>
    <div class="box">

        <h1>{{this.title}}</h1>
        <el-form @submit.prevent.native="submitForm('ruleForm')"
                 :model="ruleForm" :rules="rules" ref="ruleForm">

            <el-form-item label="Название" prop="title">
                <el-input v-model="ruleForm.title"/>
            </el-form-item>

            <el-form-item label="Текст в формате .md или .html" prop="text">
                <el-input v-model="ruleForm.text" type="textarea" resize="none" :rows="10"/>
            </el-form-item>

            <el-upload
                    ref="upload"
                    style="margin-bottom: 1rem"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :auto-upload="false"
                    :on-change="handelImgChange"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Перетащите картинку или <em>нажмите для загрузки</em></div>
                <div class="el-upload__tip" slot="tip">файлы с расшитрениме jpg/png</div>
            </el-upload>

            <el-form-item>
                <el-button type="primary" native-type="submit" round :loading="loading">Создать</el-button>
                <el-button type="success" plain round @click="preview = true">Предпросмотр</el-button>
            </el-form-item>


        </el-form>

        <el-dialog title="Предпросмотр" :visible.sync="preview">
            <div v-html="$md.render(ruleForm.text)"></div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        head: {
            title: `Новый пост | ${process.env.appName}`
        },
        layout: 'admin',
        data: () => ({
            title: 'Создание поста',
            preview: false,
            loading: false,
            image: null,
            ruleForm: {
                title: '',
                text: '',
            },
            rules: {
                title: [
                    { required: true, message: 'Название не должен быть пустым', trigger: 'blur' },
                ],
                text: [
                    { required: true, message: 'Текст не должен быть пустым', trigger: 'blur' },
                ],
            }
        }),
        methods: {
            handelImgChange(file,fileList) {
                console.log('file: ', file);
                this.image = file.raw;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid && this.image) {
                        this.loading = true;
                        try {
                            const data = {
                                image: this.image,
                                title: this.ruleForm.title,
                                text: this.ruleForm.text,
                            };

                            const res = await this.$store.dispatch('post/create',data);

                            if(res) {
                                this.ruleForm.title = this.ruleForm.text = '';
                                this.image = null;
                                this.$refs.upload.clearFiles();

                                this.$message.success('Пост добавлен');
                            }

                            this.loading = false;

                        } catch (e) {
                            this.$message.error('Ошибка добавленя поста, подробнее в console');
                            console.log('e: ', e);
                            this.loading = false;
                        }
                    }
                    else {
                        this.$message.warning('Добавьте картинку к посту');
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .box {
        width: 600px;
    }
    h1 {
        margin-bottom: 1rem;
    }
</style>