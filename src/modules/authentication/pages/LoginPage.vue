<template>
    <v-app>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center" >
                    <v-col cols="12" sm="8" md="4">
                        <v-alert dense dismissible type="error" v-if="error">
                            {{ error }}
                        </v-alert>
                        <v-card class="elevation-12" >
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>
                                    <span class="font-weight-light">Login to </span>
                                    <span class="font-weight-medium">Ezi-Task</span>
                                    <span class="ml-1 font-weight-medium">CRM</span>
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="Username"
                                            name="username"
                                            prepend-icon="mdi-account"
                                            type="text" v-model="form.username" />

                                    <v-text-field
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password" v-model="form.password" />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="primary"
                                       :loading="loading"
                                       @click="loginHandler">
                                    Login
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "LoginPage",
        data(){
            return {
                form: {
                    username: '',
                    password: '',
                },
                loading: false,
                error: '',
            }
        },
        methods: {
            ...mapActions('auth', ['login']),
            async loginHandler(){
                try {
                    this.loading = true;
                    await this.login(this.form)
                    await this.$router.push({name: 'dashboard'})
                }catch (e) {
                    console.log(e)
                }finally {
                    this.loading = false;
                }
            }

        }

    }
</script>

<style scoped>

</style>