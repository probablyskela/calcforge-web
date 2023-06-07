<script setup lang="ts">
import { reactive, ref } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import type {CalculatorSettings} from '@/assets/interfaces/calculator/ICalculatorSettings';
import BaseButton from '@/components/BaseButton.vue';
import { calculator_service } from '@/assets/services/calculator';

const calculatorSettings = reactive(<CalculatorSettings> {
    name: "",
    description: "",
    input: "",
    code: "",
    is_public: true
})
</script>

<template>
<section id="create-calc-section">
<div class="section-wrapper">
    <h2>create calculator</h2>
    <label for="">
        <h3>calculator name:</h3>
        <BaseInput v-model="calculatorSettings.name" :width="240" type="text" placehoder="name"></BaseInput>
    </label>
    <label for="">
        <h3>calculator description:</h3>
        <BaseInput v-model="calculatorSettings.description" :width="400" type="text" placehoder="description"></BaseInput>
    </label>
    <label for="">
        <h3>calculator input format:</h3>
        <BaseInput v-model="calculatorSettings.input" :width="400" type="text" placehoder="input"></BaseInput>
    </label>

    <h3>calculator code url:</h3>
    <div class="code-wrapper">
        <label for="">make code public: <BaseInput v-model="calculatorSettings.is_public" :width="24" type="checkbox" placehoder="calculator  name"></BaseInput></label>
        <label for=""><BaseInput v-model="calculatorSettings.code" :width="240" type="url" placehoder="calculator code link"></BaseInput></label>
    </div>
    <BaseButton @click.prevent="calculator_service.create_calculator(calculatorSettings)" :width="200">Create calculator</BaseButton>
</div>
</section>
</template>

<style scoped lang="scss">
#create-calc-section {
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
        margin-bottom: 10px;
    }

    .section-wrapper {
        @include base-wrapper();

        display: flex;
        flex-direction: column;
        gap: 20px;

        .code-wrapper {
            display: flex;
            align-items: center;
            gap: 15px;

            label {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        }
    }
}
</style>