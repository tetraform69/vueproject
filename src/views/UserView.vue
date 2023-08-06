<template>
    <div class="home">
        <NavUser></NavUser>
        <h1>This is an user page</h1>
        <h1>Hello</h1>
    </div>
</template>

<script>

import NavUser from '@/components/NavUser.vue'

export default {
    name: 'UserView',
    components: {
        NavUser
    },
    data: () => ({

    }),
    methods: {

    },
}
</script>

<style scoped></style>