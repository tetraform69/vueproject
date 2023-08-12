<template>
    <div class="home">
        <NavUser :rol="user.rol"></NavUser>
        <v-form v-model="valid" class="form" @submit.prevent>
            <v-text class="title">User</v-text>
            <div class="col">
                <v-text-field class="input" v-model="user.name" :rules="inputRules" label="Username" required></v-text-field>
                <v-text-field class="input" v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field class="input" v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[passwordrules.required, passwordrules.min]" :type="show1 ? 'text' : 'password'" label="Password" @click:append="show1 = !show1"></v-text-field>
            </div>
            <v-btn type="submit" class="btn" @click="update" :disabled="!valid">Update</v-btn>
        </v-form>
    </div>
</template>

<script>

import NavUser from '@/components/NavUser.vue'
import axios from 'axios'

export default {
    name: 'UserView',
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
        valid: false,
        password: '',
        show1: false,
        inputRules: [
            value => {
                if (value) return true
                return 'E-mail is requred.'
            },
            value => {
                if (value.length >= 4) return true
                return 'Min 4 characters'
            },
        ],
        emailRules: [
            value => {
                if (value) return true
                return 'E-mail is requred.'
            },
            value => {
                if (/.+@.+\..+/.test(value)) return true
                return 'E-mail must be valid.'
            },
        ],
        passwordrules: {
            required: value => !!value || 'Password is required.',
            min: v => v.length >= 4 || 'Min 4 characters'
        },
    }),
    methods: {
        update: function () {
            let token = localStorage.token
            axios.patch(`http://127.0.0.1:8000/api/users/update/${this.user.id}`, {
                name: this.user.name,
                email: this.user.email,
                password: this.password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data)
                    this.user = res.data.user
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    },
}
</script>

<style scoped>
.home {
    display: grid;
    grid-template-rows: 50px;
    height: 100vh;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    justify-self: center;
    max-width: 90%;
    width: 500px;
    background: rgb(217 217 217);
    max-width: 90%;
    width: 400px;
    height: 500px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
}

.col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 90%;
    width: 90%;
    max-height: 50%;
}

.btn {
    max-height: 10%;
    max-width: 90%;
}

.input {
    width: 100%;
    margin: 10px;
}

.title {
    font-size: xx-large;
    font-weight: 700;
    letter-spacing: 5px;
    position: relative;
    bottom: 20px;
}
</style>