<template>
    <div class="empty-layout">
        <Nuxt/>
    </div>
</template>

<script>
    export default {
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
    .empty-layout {
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top: 15rem;
    }
</style>