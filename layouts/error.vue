<template>
    <div class="error-layout">
        <div class="error-content">
            <div class="error-title"><h2>Ошибка 404</h2></div>
            <n-link to="/">Вернуться на главную</n-link>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .error {
        &-layout {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
        &-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 4rem;
        }
        &-title {
            color: #ff726d;
            margin-bottom: 1rem;
        }
    }
</style>