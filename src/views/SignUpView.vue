<script setup lang="ts">
import router from '@/router';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { reactive } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import { user_service } from '@/assets/services/user'; 
import type { UserSignUp } from '@/assets/interfaces/user/iUserSignUp';

const authStore = useAuthStore();

if (authStore.authorized) {
    router.push('/profile');    
}

const userSignUp = reactive(<UserSignUp>{});
</script>

<template>
    <main class="main">
        <div class="wrapper">
            <form @submit.prevent="authStore.sign_up(userSignUp)" class="sign-up_form">
                <h2>sign up</h2>

                <BaseInput v-model="userSignUp.username" :width="240" placehoder="username" required></BaseInput>
                <BaseInput v-model="userSignUp.email" :width="240" type="email" placehoder="email" required></BaseInput>
                <BaseInput v-model="userSignUp.password" :width="240" type="password" placehoder="password" required></BaseInput>

                <BaseButton :width="200">sign up</BaseButton>

                <p>already have an account?
                    <RouterLink to="/sign-in">sign in</RouterLink>
                </p>
            </form>
        </div>
    </main>
</template>

<style scoped lang="scss">
.main {
    @include base-section();
    min-height: calc(100vh - 160px);

    a { 
    @include link-underline($dark-main);
    @include fix-text();
  }
  
    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        .sign-up_form {
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