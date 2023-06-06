<script setup lang="ts">
import router from '@/router';
import { user_service } from '@/assets/services/user';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();

if (!authStore.authorized) {
    router.push('/sign-in');
}

const profile = await user_service.get_profile(false);

if (profile === false) {
    authStore.sign_out();
    router.push('/sign-in');
}
else {
    router.push('/user/' + profile.id)
}
</script>

<template>
</template>