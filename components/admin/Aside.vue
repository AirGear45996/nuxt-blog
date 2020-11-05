<template>
    <div>
        <el-menu
                router
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="/admin">
                <i class="el-icon-menu"></i>
                <span>Аналитика</span>
            </el-menu-item>
            <el-menu-item index="/admin/post/create">
                <i class="el-icon-edit-outline"></i>
                <span>Создать пост</span>
            </el-menu-item>
            <el-menu-item index="/admin/post/list">
                <i class="el-icon-tickets"></i>
                <span>Посты</span>
            </el-menu-item>
            <el-menu-item index="/admin/user">
                <i class="el-icon-user"></i>
                <span>Пользотели</span>
            </el-menu-item>
            <el-menu-item index="/admin/logout">
                <i class="el-icon-setting"></i>
                <span>Выйти</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data: () => ({}),
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-submenu__title, .el-submenu .el-menu-item, .el-menu-item-group__title, .el-submenu__title > span,
    .el-submenu__title, .el-menu-item, .el-submenu {
        user-select: none !important;
    }
    .el-aside > div {
        height: 100%;
    }
    .el-menu-vertical-demo.el-menu {
        height: 100%;
    }
</style>