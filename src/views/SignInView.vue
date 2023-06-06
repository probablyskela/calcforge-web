<script setup lang="ts">
import router from '@/router';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { reactive } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import type { UserSignIn } from '@/assets/interfaces/user/iUserSignIn';

const authStore = useAuthStore();

if (authStore.authorized) {
    router.push('/profile');    
}

const user = reactive(<UserSignIn>{});
</script>

<template>
    <section class="sign-in_section">
        <div class="wrapper">
            <form @submit.prevent="authStore.sign_in(user)" class="sign-in_form">
                <h2>sign in</h2>
                <BaseInput v-model="user.username" :width="240" placehoder="username" required></BaseInput>
                <BaseInput v-model="user.password" :width="240" type="password" placehoder="password" required></BaseInput>
                <BaseButton :width="200">sign in</BaseButton>

                <p>dont have an account yet?
                    <RouterLink to="/sign-up">sign up</RouterLink>
                </p>
            </form>
        </div>
    </section>
</template>

<style scoped lang="scss">
.sign-in_section {
    @include base-section();
    min-height: calc(100vh - 160px);

    a { 
        @include link-underline($dark-main);
    }

    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        .sign-in_form {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            border: 1px solid $dark-main;
            padding: 120px 80px;
            position: relative;

            h2 {
                @extend %h2;
                @include base-text-gradient();
            }
        }
    }
}
</style>