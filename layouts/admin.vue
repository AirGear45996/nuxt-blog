<template>
    <div class="admin-layout">
        <el-container :style="{height: '100%'}">
            <el-aside width="250px">
                <Aside/>
            </el-aside>
            <el-main>
                <Nuxt/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        middleware: ['auth'],
        data: () => ({}),
        computed: {
            error() {
                return this.$store.getters['error']
            }
        },
        watch: {
            error(val) {
                if(val) {
                    this.$message.error(val);
                    setTimeout(() => {
                        this.$store.commit('setError',null,{root:true});
                    },0);
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .admin-layout {
        width: 100%;
        height: 100vh;
    }
</style>