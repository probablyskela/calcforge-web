<script setup lang="ts">
import { ErrorCodes, reactive, ref } from 'vue';
import CalculatorListItem from '@/components/CalculatorListItem.vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { calculator_service } from '@/assets/services/calculator';
import type { Calculator } from '@/assets/interfaces/calculator/ICalculator';

const authStore = useAuthStore();
const calculators = reactive(<[Calculator]><unknown>[]);

const res = await calculator_service.get_calculators();

if (res !== false) {
  res.forEach(calculator => {
    calculators.push(calculator);
  })
}
</script>

<template>
<section id="calculators-section">
    <div class="calculators-wrapper">
    <h2>calculators</h2>
    <div class="calc-options">
        <h3>calculators:</h3>
        <RouterLink to="/create-calculator" v-if="authStore.authorized">create calculator ></RouterLink>
    </div>
    <div class="calc-results results">
        <div class="result">
            <CalculatorListItem v-for="calc in calculators" :id="calc.id"></CalculatorListItem>
        </div>
    </div>
</div>
</section>
</template>

<style scoped lang="scss">

#calculators-section {
  @include base-section();
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  min-height: calc(100vh - 160px);

  h2 {
    @extend %h2;
  }

  h3 {
    @extend %h3;
    text-align: left;
  }

  label, a {
    @include fix-text();
  }

  select {
    border: none;
    border-bottom: 1px solid $dark-main;
    border-radius: 0;
    background-color: transparent;
    font-size: 17px;
    min-width: 140px;
    max-width: 180px;

    &:focus-visible {
      outline: none;
      border-bottom: 2px solid $dark-main;
    }
  }

  .calculators-wrapper {
    @include base-wrapper();

    display: flex;
    flex-direction: column;
    gap: 20px;

    // .calculator-filters {
    //   display: flex;
    //   gap: 15px;

    //   a {
    //     @include link-underline($dark-main);
    //   }
    // }

    .calc-options {
        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
            color: green;
        }
    }

    .results {
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

@media (max-width: 980px) {
}

</style>