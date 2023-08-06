<template>
    <nav class="Nav">
        <a href="" ></a>
    </nav>
</template>

<script>

// @ is an alias to /src @/components/LoginApp.vue
import axios from 'axios'

export default {
    name: 'NavUser',
    mounted: async function () {

        let token = localStorage.token

        axios.get("http://127.0.0.1:8000/api/userprofile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(request => {
                console.log(request.data)
                this.user=request.data
            })
            .catch(function (err) {
                console.log(err)
            })
    },
    data: () => ({
        user: {},
        roles: {
            user: [
                'settings',
                'logout'
            ],
            admin: [
                'new user',
                'settings',
                'logout'
            ]
        }
    }),
}
</script>
