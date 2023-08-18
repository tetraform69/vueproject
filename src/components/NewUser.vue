<template>
    <div class="modal-container" :class="show ? 'show' : 'hidden'">
        <v-form v-model="valid" class="form" @submit.prevent>
            <div class="title">New User</div>
            <div class="col">
                <v-text-field v-model="name" label="Username" required></v-text-field>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordrules.required, passwordrules.min]" :type="show1 ? 'text' : 'password'" label="Password"
                    @click:append="show1 = !show1" required></v-text-field>
            </div>
            <v-btn type="button" class="btn" @click="create" :disabled="!valid">create new user</v-btn>
            <v-btn type="button" class="btn" @click="close(false)">Cancel</v-btn>
        </v-form>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            valid: false,
            name: "",
            email: "",
            password: "",
            show1: false,
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
        }
    },
    methods: {
        create: function () {
            axios.post("http://127.0.0.1:8000/api/users/create", {
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(this.close(true))
                .catch(err => {
                    console.log(err)
                })
        },
        close: function (result) {
            this.$emit('newUser', result)
        }
    },
    props: {
        show: {
            type: Boolean
        }
    },
}
</script>

<style lang="scss" scoped>
.modal-container {
    position: absolute;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

.show {
    display: flex;
}

.hidden {
    display: none;
}

.form {
    background: #c3c3c3;
    max-width: 90%;
    width: 400px;
    height: 500px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
}

.btn {
    margin-bottom: 5px;
}

.title {
    font-size: x-large;
    margin-bottom: 20px;
}
</style>