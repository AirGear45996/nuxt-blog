<template>
    <div>
        <h1>Аналитика по постам</h1>
        <AnalyticsChart title="Кол-во просмотров" :labels="views.labels" :data="views.data" />
        <AnalyticsChart title="Кол-во комментариев" :labels="comments.labels" :data="comments.data" />
    </div>
</template>

<script>
    export default {
        head: {
            title: `Аналитика | ${process.env.appName}`
        },
        layout: 'admin',
        data: () => ({}),
        async asyncData({ store }) {
            const { views, comments } = await store.dispatch('post/getAnalytics');
            return { views, comments } ;
        },
    }
</script>

<style lang="scss" scoped>

</style>