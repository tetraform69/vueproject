<template>
    <div class="home">
        <v-form v-model="valid" class="form" @submit.prevent>
            <v-text class="title">Login</v-text>
            <div class="col">
                <v-text-field class="input" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field class="input" v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordrules.required, passwordrules.min]" :type="show1 ? 'text' : 'password'" label="Password"
                    @click:append="show1 = !show1"></v-text-field>
            </div>
            <v-btn type="submit" class="btn" @click="login" :disabled="!valid">Login</v-btn>
        </v-form>
    </div>
</template>

<script>
// @ is an alias to /src @/components/LoginApp.vue
import axios from 'axios'

export default {
    name: 'LoginView',
    components: {
    },
    data: () => ({
        valid: false,
        email: '',
        password: '',
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
            min: v => v.length >= 5 || 'Min 5 characters'
        },
    }),
    methods: {
        login: function () {
            axios.post("http://127.0.0.1:8000/api/auth", {
                email: this.email,
                password: this.password
            })
                .then(res => {
                    localStorage.token = res.data.token
                    window.location = `/#/${res.data.user.rol}`
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    },
}
</script>

<style scoped>

.form {
    background: rgb(217 217 217);
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
    margin: 30px;
}

.title {
    font-size: xx-large;
    font-weight: 700;
    letter-spacing: 5px;
    position: relative;
    bottom: 20px;
}
</style>