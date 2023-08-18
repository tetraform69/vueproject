<template>
    <div class="modal-container" :class="show ? 'show' : 'hidden'">
        <v-form v-model="valid" class="form" @submit.prevent>
            <div class="title">Edit User</div>
            <div class="col">
                <v-text-field v-model="name" :placeholder="user.name" label="Username" name="updatename"></v-text-field>
                <v-text-field v-model="email" :placeholder="user.email" :rules="emailRules" label="E-mail"
                    required name="updateemail"></v-text-field>
                <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordrules.required, passwordrules.min]" :type="show1 ? 'text' : 'password'"
                    label="Password" @click:append="show1 = !show1" required name="updatepassword"></v-text-field>
            </div>
            <v-btn type="button" class="btn" @click="update" :disabled="!valid">update</v-btn>
            <v-btn type="button" class="btn" @click="close(false)">cancel</v-btn>
        </v-form>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: "EditUser",
    props: {
        show: {
            type: Boolean
        },
        user: {
            type: Object,
            default() {
                return {
                    id: 0,
                    name: '',
                    email: '',
                }
            }
        }
    },
    data() {
        return {
            valid: false,
            show1: false,
            name: "",
            email: "",
            password: "",
            emailRules: [
                value => {
                    if (value.length == 0 || /.+@.+\..+/.test(value)) return true
                    return 'E-mail invalid.'
                },
            ],
            passwordrules: {
                required: value => !!value || 'Password is required.',
                min: v => v.length >= 4 || 'Min 4 characters'
            },
        }
    },
    methods: {
        update: function () {

            let token = localStorage.token

            axios.patch(`http://127.0.0.1:8000/api/users/update/${this.user.id}`, {
                name: this.name ||= this.user.name,
                email: this.email ||= this.user.email,
                password: this.password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(this.close(true))
                .catch(err =>{
                    console.log(err)
                })
        },
        close: function (result) {
            this.$emit('editUser', result)
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