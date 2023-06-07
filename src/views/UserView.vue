<script setup lang="ts">
import type { User } from '@/assets/interfaces/user/iUser';
import type { UserSettings } from '@/assets/interfaces/user/iUserSettings';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { user_service } from '@/assets/services/user';
import router from '@/router';
import { ref, reactive } from 'vue';
import CalculatorListItem from '@/components/CalculatorListItem.vue';

interface Props {
    id: string
}

const props = defineProps<Props>();

const user_res = await user_service.get_user(+props.id);

if (user_res === false) {
    router.push('/');
}

const user = reactive({user: user_res as User});

const profile_res = await user_service.get_profile(false);
const owner = ref(false);

if (profile_res !== false && profile_res.id === user.user.id) {
    owner.value = true;
}

const settings = reactive(<UserSettings>{username: '', email: '', old_password: '', new_password: '', confirm_new_password: ''});

async function update_user_wrapper() {
    await user_service.update_user(settings, user.user);
    const user_res = await user_service.get_user(+props.id);
    user.user = user_res as User;
}
</script>

<template>
<section class="user_section">
    <div class="profile_wrapper">
        <h2>profile</h2>
        <div class="profile">
            <div class="profile_inner_wrapper">
                <p class="profile_username" id="profile_username">{{user.user.username}}</p>
                <div class="profile_email_wrapper">
                    <span>&lt;</span>
                    <p class="profile_email" id="profile_email">{{user.user.email}}</p>
                    <span>></span>  
                </div>
            </div>
            <h3>calculators: </h3>
            <div class="calculators" id="profile_calculators">
                <CalculatorListItem v-for="id in user.user.calculatorIds" :id="id"></CalculatorListItem>
            </div>
        </div>
    </div>
    <div v-if="owner" class="settings_wrapper">
        <h2>settings</h2>
        <div class="settings">
            <div class="column column-1">
                <div class="change-password">
                    <h3>change password:</h3>
                    <label><BaseInput v-model="settings.old_password" :width="240" type="password" placehoder="old password"></BaseInput></label>
                    <label><BaseInput v-model="settings.new_password" :width="240" type="password" placehoder="new password"></BaseInput></label>
                    <label><BaseInput v-model="settings.confirm_new_password" :width="240" type="password" placehoder="confirm new password"></BaseInput></label>
                </div>
            </div>
            <div class="column column-2">
                <div class="change-username">
                    <h3>change username:</h3>
                    <label><BaseInput v-model="settings.username" :width="240" placehoder="username"></BaseInput></label>
                </div>
                <div class="change-email">
                    <h3>change email:</h3>
                    <label><BaseInput v-model="settings.email" :width="240" type="email" placehoder="email"></BaseInput>
                    </label>
                </div>
                <BaseButton @click.prevent="update_user_wrapper" :width="240">Save</BaseButton>
            </div>
        </div>
    </div>
    <div v-if="owner" class="delete-user_wrapper">
        <h2>delete user</h2>
        <BaseButton @click.prevent="user_service.delete_user(props.id)" :width="200">Delete user</BaseButton>
    </div>
</section>
</template>

<style scoped lang="scss">
.user_section {
    @include base-section();
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;

    h2 {
        @extend %h2;
    }

    h3 {
        @extend %h3;
        text-align: left;
    }

    .profile_wrapper {
        @include base-wrapper();

        .profile {
            text-align: center;

            .profile_username {
                font-size: 22px;
                font-weight: 600;
            }
            .profile_inner_wrapper {
                justify-content: center;
                display: flex;
                align-items: center;
                gap: 20px;
            }
            .profile_email_wrapper {
                display: flex;
            }

            .calculators {
                width: 100%;
                padding: 10px 10px;
                border: 1px solid $dark-main;

                min-height: 250px;
                max-height: 400px;
                overflow-y: scroll;
                overflow-x: hidden;
                box-sizing: border-box;

                display: flex;
                flex-direction: column;
                gap: 7px;
            }
        }
    }
    .settings_wrapper {
        @include base-wrapper();

        .settings {
            .column {
            width: 260px;
            display: flex;
            flex-direction: column;
            gap: 30px;

            div {
                display: flex;
                flex-direction: column;
                gap: 25px;
            }
            }

            display: flex;
            justify-content: center;
            gap: 120px;
        }
    }

    .delete-user_wrapper {
        @include base-wrapper();

        button {
            color: red;
            transition: 0.3s all ease;

            &:hover {
            background-color: rgba(255, 0, 0, 0.5) 0 0 15px;
            }
        }
    }
}
</style>