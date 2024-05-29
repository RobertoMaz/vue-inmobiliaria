<script setup>
    import { useForm, useField } from 'vee-validate'
    import { loginSchema } from '@/validation/loginSchema'
    import { useAuthStore } from '@/stores/auth'
    
    const {handleSubmit} = useForm({ validationSchema: loginSchema })
    const email = useField('email')
    const password = useField('password')
    const auth = useAuthStore()

    const submit = handleSubmit((values) => {
        auth.login(values)    
    })
</script>

<template>
    <v-card
        flat
        max-width="600"
        class="mx-auto"
    >
        <v-card-title
            class="text-h4 font-weight-bold pb-1"
        >
            Iniciciar Sesión
        </v-card-title>
        <v-card-subtitle class="text-h6">
            Iniciar sesión con tu cuenta
        </v-card-subtitle>
        <v-alert
            v-if="auth.hasError"
            class="my-5"
            type="error"
            :title="auth.errorMensaje"
        >
        </v-alert>
        <v-form
            class="mt-5"
        >
            <v-text-field
                type="email"
                label="Email"
                class="mb-3 "
                bg-color="indigo-lighten-4"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                />
                <v-text-field
                type="password"
                label="Password"
                class="mb-3"
                bg-color="indigo-lighten-4"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
            />
            <v-btn
                color="indigo"
                @click="submit"
            >
                Iniciar sesión
            </v-btn>
        </v-form>
    </v-card>
</template>