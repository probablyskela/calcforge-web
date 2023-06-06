<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();

</script>

<template>
    <header class="header">
        <div class="header_logo">
            <RouterLink to="/">calcforge</RouterLink>
        </div>
        <nav class="header_nav__desktop">
            <ul>
                <li>
                    <RouterLink to="/profile" v-if="authStore.authorized">profile</RouterLink>
                </li>
                <li>
                    <RouterLink to="/calculators">calculators</RouterLink>
                </li>
            </ul>
        </nav>

        <div class="header_authorization__desktop">
            <RouterLink v-if="!authStore.authorized" to="/sign-in">sign in</RouterLink>
            <a v-else @click.prevent="authStore.sign_out">sign out</a>
        </div>
 
        <nav class="header_nav__mobile">
            <ul>
                <li>
                    <RouterLink to="/profile" v-if="authStore.authorized">profile</RouterLink>
                </li>
                <li>
                    <RouterLink to="/">calculators</RouterLink>
                </li>
                <li>
                    <RouterLink to="/">sign in</RouterLink>
                </li>
                <li>
                    <a @click.prevent="authStore.sign_out">sign out</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped lang="scss">
.header {
    @include base-section();
    height: 80px;
    padding: 0 2vw;

    display: flex;
    align-items: center;

    a {
        @include link-underline($dark-main);
        cursor: pointer;
    }

    .header_logo a {
        @include base-text-gradient();
        font-size: ($base-font-size - $base-font-size-offset) * 2;
    }

    .header_nav__desktop {
        display: flex;
        margin-left: 30px;
        ul {
            display: flex;
            gap: 20px;
        }
    }

    .header_authorization__desktop {
        margin-left: auto;
    }

    .header_nav__mobile {
        display: none;
    }
}

@media (max-width: 768px) {
    .header_nav__desktop, .header_authorization__desktop {
        display: none !important;
    }

    .header_nav__mobile {
        display: block !important;
    }
}
</style>
