<template>
        <v-form v-model="valid" class="home" @submit.prevent>
            <v-col class="col">
                <v-text></v-text>
            </v-col>
            <v-col class="col">
                <v-text-field v-model="username" :rules="nameRules" :counter="10" label="User name"></v-text-field>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            </v-col>
            <v-btn type="submit" class="btn" :disabled="!valid">Submit</v-btn>
        </v-form>
</template>

<script>
// @ is an alias to /src @/components/LoginApp.vue

export default {
    name: 'LoginView',
    components: {
    },
    data: () => ({
        valid: false,
        username: '',
        nameRules: [
            value => {
                if (value) return true

                return 'Username is required.'
            },
            value => {
                if (value?.length <= 10) return true

                return 'Name must be less than 10 characters.'
            },
        ],
        email: '',
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
    }),
}
</script>

<style>

#app {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.home {
    background: rgb(145, 145, 145);
    max-width: 90%;
    width: 400px;
    height: 500px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.col{
    max-width: 90%;
    width: 90%;
    max-height: 20%;
}

.btn{
    max-height: 10%;
    max-width: 90%;
}

</style>