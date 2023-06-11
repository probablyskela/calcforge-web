<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();

async function toggle_mobile_menu() {
    document.querySelectorAll('.header_nav__mobile').forEach(element => {
        element.classList.toggle('active');
    })
}
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

        <a class="header_nav-btn__mobile" @click.prevent="toggle_mobile_menu">menu ></a>
 
        <nav class="header_nav__mobile">
            <ul>
                <li>
                    <RouterLink to="/profile" v-if="authStore.authorized">profile</RouterLink>
                </li>
                <li>
                    <RouterLink to="/calculators">calculators</RouterLink>
                </li>
                <li v-if="!authStore.authorized">
                    <RouterLink to="/sign-in" >sign in</RouterLink>
                </li>
                <li v-else>
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

    .header_nav-btn__mobile {
        display: none;
    }
}

@media (max-width: 768px) {
    .header_nav__desktop, .header_authorization__desktop {
        display: none !important;
    }

    .header_nav-btn__mobile {
        display: block !important;
        margin-left: auto;
    }

    .header_nav__mobile {
        top: 80px;
        left: 0;
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 10px 20px 10px;
        background-color: $light-main;
        border-bottom: 1px solid $dark-main;
        z-index: 999;

        &.active {
            display: block !important;
        }

        ul {
        margin: 10px 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 20px;

        li {
            list-style: none;
            border-bottom: 1px solid $dark-main;

            a {
            @include link-underline($dark-main);
            @include fix-text();
            display: inline !important;
            font-size: 20px;
            }
        }
        }
    }
}
</style>
