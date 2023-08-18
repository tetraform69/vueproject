<template>
    <div class="modal-container" :class="show ? 'show' : 'hidden'">
        <div class="modal">
            <div class="title">Are you sure in deleted the user: {{ user.name }}?</div>
            <div class="butt">
                <v-btn type="button" class="btn" @click="deletedUser">delete</v-btn>
                <v-btn type="button" class="btn" @click="close(false)">cancel</v-btn>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: "deleteUser",
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
        }
    },
    methods: {
        deletedUser: function () {

            let token = localStorage.token

            axios.delete(`http://127.0.0.1:8000/api/users/delete/${this.user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(this.close(true))
                .catch(err => {
                    console.log(err)
                })
        },
        close: function (result) {
            this.$emit('deleteUser', result)
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

.modal {
    background: #c3c3c3;
    max-width: 90%;
    width: 400px;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
}

.title {
    font-size: x-large;
    margin-bottom: 20px;
}

.btn{
    margin: 0px 10px;
}

</style>