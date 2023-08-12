<template lang="">
    <div>
        <NavUser :rol="user.rol"></NavUser>
        <template>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Calories
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in desserts"
                        :key="item.name"
                    >
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                    </tr>
                </tbody>
            </v-table>
        </template>
    </div>
</template>
<script>

import NavUser from '@/components/NavUser.vue'
import axios from 'axios'

export default {
    name: 'AdminView',
    components: {
        NavUser
    },
    mounted: async function () {

        let token = localStorage.token

        axios.get("http://127.0.0.1:8000/api/userprofile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                this.user = res.data
            })
            .catch(err => {
                console.log(err)
            })
    },
    data: () => ({
        user: {},
        desserts: [
            {
                name: 'Frozen Yogurt',
                calories: 159,
            },
            {
                name: 'Ice cream sandwich',
                calories: 237,
            },
            {
                name: 'Eclair',
                calories: 262,
            },
            {
                name: 'Cupcake',
                calories: 305,
            },
            {
                name: 'Gingerbread',
                calories: 356,
            },
            {
                name: 'Jelly bean',
                calories: 375,
            },
            {
                name: 'Lollipop',
                calories: 392,
            },
            {
                name: 'Honeycomb',
                calories: 408,
            },
            {
                name: 'Donut',
                calories: 452,
            },
            {
                name: 'KitKat',
                calories: 518,
            },
        ],
    }),
}
</script>
<style lang="">
    
</style>