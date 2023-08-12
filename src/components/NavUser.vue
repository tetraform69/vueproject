<template>
    <nav class="Nav">
        <template v-for="option in options">
            <router-link :to="option.url" :key="option.text" class="navOption">{{ option.text }}</router-link>
        </template>
    </nav>
</template>

<script>

// @ is an alias to /src @/components/LoginApp.vue

export default {
    name: 'NavUser',
    props: {
        rol: {
            type: String
        }
    },
    data: () => ({
        ops: [
            {
                text: 'home',
                url: '/user'
            },
            {
                text: 'logout',
                url: '/'
            },
        ]
    }),
    computed: {
        options: function () {
            if (this.rol == "admin") {
                return this.ops.toSpliced(1, 0, {
                    text: "users",
                    url: "/admin",
                })
            }
            return this.ops
        }
    }
}
</script>

<style scoped>
.Nav {
    background: #999999;
    position: sticky;
    top: 0px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-self: flex-start;
}

.navOption {
    min-width: 150px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: larger;
    font-weight: 500;
    text-decoration: none;
    letter-spacing: 3px;
    text-transform: uppercase;
    transition: all 0.5s;
    color: #00254a;
}

.navOption:hover {
    letter-spacing: 4px;
    color: #7bcaff;
}
</style>