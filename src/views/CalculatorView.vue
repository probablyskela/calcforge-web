<script async setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { Calculator } from '@/assets/interfaces/calculator/ICalculator';
import { calculator_service } from '@/assets/services/calculator'; 
import { user_service } from '@/assets/services/user';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import router from '@/router';
import { RouterLink } from 'vue-router';
import type { User } from '@/assets/interfaces/user/iUser';
import { review_service } from '@/assets/services/review';
import BaseReview from '@/components/BaseReview.vue';
import type { Review } from '@/assets/interfaces/review/IReview';
import type { ReviewCreate } from '@/assets/interfaces/review/IReviewCreate';
import type {CalculatorRun} from '@/assets/interfaces/calculator/ICalculatorRun';
import * as io from "socket.io-client";
import {connect_socket} from '@/assets/services/socket';

interface Props {
    id: string
};

const props = defineProps<Props>();

const res = await calculator_service.get_calculator_by_id(+props.id);
if (res === false) {
    router.push('/404');
}
const calculator = reactive(res as Calculator);


const author = await user_service.get_user(calculator.author_id);
const curr_user = await user_service.get_profile(false);


function curr_user_has_review(reviews: [Review], user: User) {
  if (curr_user === false) {
    return -1;
  }
  for (let index = 0; index < (reviews as [Review]).length; index++) {
    const element = (reviews as [Review])[index];
    if (element.authorId == user.id) {
      return index;
    }
  }
  return -1;
}

const reviews = reactive(await review_service.get_reviews(calculator.id) as [Review]);
const has_review = ref(curr_user_has_review(reviews as [Review], curr_user as User));
const calc_owner = ref(false);
if ((curr_user as boolean) !== false) {
  calc_owner.value = (curr_user as User).id === calculator.author_id
}

const reviewCreate = reactive(<ReviewCreate>{rating: 0, message: ''});
const calculatorRun = reactive(<CalculatorRun>{input: '', output: ''});

async function run_calc() {
  calculatorRun.output = await calculator_service.run_calculator(+props.id, calculatorRun.output) as string;
}

const socket_url = import.meta.env.VITE_SOCKET_URL;
const socket = io.connect(socket_url, {
  query: {
    'calculator_id': props.id
  }
});
const socket_connected = ref(true);
console.log(socket);

socket.on('connected', () => {
  console.log(socket.id);
  socket_connected.value = true;
})

socket.on('disconnected', () => {
  console.log(socket.id);
  socket_connected.value = false;
})

socket.on("reviews_changed", (args) => {
  console.log('aksjdkljaskldjasd');
  console.log(args);      
})
</script>

<template>
<section id="calculator-section">
<div class="calculator-wrapper">
    <h2>calculator</h2>
    <div class="calculator-info">
            <div class="calculator-options">
              <p class="calculator-info_name">{{ calculator.name }}</p>
              <RouterLink v-if="calc_owner" :to="`/calculators/${props.id}/edit`">edit calculator ></RouterLink>
            </div>
            <RouterLink :to="`/user/${calculator.author_id}`">author: {{ (author as User).username }}</RouterLink>
            <p class="calculator-info_desc">{{ calculator.description }}</p>
            <a target="_blank" :href="calculator.code" v-if="calculator.is_public">code: {{ calculator.code }}</a>
          </div>
        <!-- <h3>example:</h3>
        <div class="calculator-content">
            <p>input: {{ calculator.input }}</p>
            <br>
            <p>output: Lorem </p>
        </div> -->
        <h3>run:</h3>
        <div class="calculator-content">
            <label> input:
                <BaseInput v-model="calculatorRun.input" :width="300" type="text" placehoder="calculator input"></BaseInput>
            </label>
            <p>output: {{ calculatorRun.output }} </p>
            <a @click.prevent="run_calc">run ></a>
        </div>
    </div>
    <div class="review-wrapper">
        <h2>reviews</h2>
        <div class="add-review" v-if="has_review === -1">
            <label><textarea v-model="reviewCreate.message" cols="30" rows="10"></textarea></label>
            <label for="">
              Rating:
              <select v-model="reviewCreate.rating">
                <option value="5" selected>5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </label>
            <BaseButton :width="240" @click.prevent="review_service.create_review(+props.id, reviewCreate)">Send</BaseButton>
        </div>

        <div class="review_wrapper_box">
          <h3>reviews:</h3>
          <BaseButton v-if="has_review !== -1" :width="200" @click.prevent="review_service.delete_review(+props.id)">Delete my review</BaseButton>
        </div>

        <div class="reviews">
          <BaseReview v-for="review in reviews" :review="(review as Review)"></BaseReview>
        </div>
</div>
</section>
</template>

<style scoped lang="scss">

#calculator-section {
    @include base-section();
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;

.calculator-options {
  display: flex;
  justify-content: space-between;
}

  h2 {
    @extend %h2;
  }

  h3 {
    @extend %h3;
    text-align: left;
    margin-top: 20px;
  }

  .calculator-wrapper {
    @include base-wrapper();

    .calculator-info {
      text-align: left;

      .calculator-info_name {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      a {
        text-decoration: underline;
      }


      .calculator-info_desc {
        margin-top: 10px;
        margin-bottom: 20px;

        &::before {
          content: "description: ";
        }
      }
    }

    .calculator-content {
      box-sizing: border-box;
      padding: 40px 20px;
      border: 1px solid $dark-main;
      margin-top: 10px;
      text-align: left;
      position: relative;

      a {
        @include link-underline($dark-main);
        @include fix-text();
        position: absolute;
        bottom: 5px;
        right: 5px;
      }

      input {
        margin-bottom: 20px;
      }
    }
  }

  .review-wrapper {
    @include base-wrapper();

    .review_wrapper_box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0;
    }

    .add-review {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: end;

      label {
        width: 100%;
      }

      textarea {
        resize: none;
        width: 100%;
        height: 125px;
        overflow-y: scroll;
      }

      a {
        @include fix-text();
        @include link-underline($dark-main);

        margin-top: 10px;
        font-size: 20px;
      }
    }

    .reviews-paging {
      list-style: none;
      display: flex;
      gap: 10px;
      padding: 0;

      a {
        text-decoration: underline;
      }
    }

    .reviews {
      width: 100%;
      padding: 0;
      box-sizing: border-box;

      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
}
</style>