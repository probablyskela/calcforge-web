<script setup lang="ts">
import router from '@/router';
import { RouterLink } from 'vue-router';
import type { User } from '@/assets/interfaces/user/iUser';
import { user_service } from '@/assets/services/user';
import type { Review } from '@/assets/interfaces/review/IReview';

interface Props {
    review: Review
}

const props = defineProps<Props>();
const user = await user_service.get_user(props.review.authorId);
if (user === false) {
    router.push('/404')
}
</script>

<template>
    <div class="review">
        <RouterLink :to="`/users/${props.review.authorId}`">author: {{ (user as User).username }}</RouterLink>
        <p class="rating">Rating: {{ props.review.rating }}</p>
        <p>{{ props.review.message }}</p>
    </div>
</template>

<style scoped lang="scss">
.review {
    text-align: left;
    border-bottom: 1px solid $dark-main;
    box-sizing: border-box;
    padding: 5px 0;
    a {
        text-decoration: underline;
        font-weight: bold;
    }

    .rating {
        margin: 10px 0;
    }

}
</style>