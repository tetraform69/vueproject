<template lang="">
    <div class="home">
        <NavUser :rol="user.rol"></NavUser>
        <div class="box">
            <div class="header-table">
                <div class="header-table-col">#</div>
                <div class="header-table-col">user</div>
                <div class="header-table-col">email</div>
                <div class="header-table-col">status</div>
                <div class="header-table-col">
                    <v-btn @click="showNewUser = true">
                        <v-icon>mdi-plus-box</v-icon>
                    </v-btn>
                </div>
            </div>
            <div class="body-table" id="body-table">
                <div class="row" v-for="(item, index) in users" :key="index">
                    <p>{{++index}}</p>
                    <p>{{item.name}}</p>
                    <p>{{item.email}}</p>
                    <p>{{item.active? "Active": "Inactive"}}</p>
                    <div class="buttons">
                        <v-btn @click="editUserShow(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                        <v-btn @click="deleteUserShow(item)"><v-icon>mdi-delete</v-icon></v-btn>
                    </div>
                </div>
            </div>
        </div>
        <NewUser :show="showNewUser" @newUser="closeModal"></NewUser>
        <EditUser :show="showEditUser" :user="editUser" @editUser="closeModal"></EditUser>
        <DeleteUser :show="showDeleteUser" :user="editUser" @deleteUser="closeModal"></DeleteUser>
    </div>
</template>
<script>

import NavUser from '@/components/NavUser.vue'
import NewUser from '@/components/NewUser.vue'
import EditUser from '@/components/EditUser.vue'
import DeleteUser from '@/components/DeleteUser.vue'
import axios from 'axios'

export default {
    name: 'AdminView',
    components: {
        NavUser,
        NewUser,
        EditUser,
        DeleteUser
    },
    data: () => ({
        user: {},
        editUser: {},
        users: [],
        showNewUser: false,
        showEditUser: false,
        showDeleteUser: false,
    }),
    mounted: async function () {

        let token = localStorage.token

        axios.get("http://127.0.0.1:8000/api/userprofile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            this.user = res.data
        })
        .catch(err => {
            console.log(err)
        })

        this.getUser()

    },
    methods: {
        editUserShow(user){
            this.editUser = user
            this.showEditUser = true
        },
        deleteUserShow(user){
            this.editUser = user
            this.showDeleteUser = true
        },
        closeModal(res) {
            if (res) {
                this.getUser()
            }
            this.showNewUser = false
            this.showEditUser = false
            this.showDeleteUser = false
        },
        getUser() {

            let token = localStorage.token

            axios.get("http://127.0.0.1:8000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                res
                this.users = res.data.users
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style scoped>
.home {
    display: grid;
    grid-template-rows: 50px;
    height: 100vh;
}

.box {
    display: flex;
    align-self: center;
    justify-self: center;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: rgb(217 217 217);
    width: 80%;
    height: 500px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
}

.header-table {
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-width: 90%;
    margin-top: 20px;
}

.header-table-col {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00000085;
    text-transform: uppercase;
    min-width: 20%;
    height: 50px;
    text-align: center;
    border-bottom: 2px solid #00000085;
}

.body-table {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 90%;
}

.row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-width: 100%;
    min-height: 50px;
}

.row:hover {
    background: #97979780;
}

.row p {
    color: #00000085;
    text-align: center;
    width: 20%;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-width: 20%;
}
</style>