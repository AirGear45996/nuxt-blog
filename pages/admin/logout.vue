<template>
    <div>
        Очищаем данные
    </div>
</template>

<script>
    export default {
        layout: 'admin',
        data: () => ({}),
        beforeCreate() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/admin/login?msg=logout')
        }
    }
</script>

<style lang="scss" scoped>

</style>