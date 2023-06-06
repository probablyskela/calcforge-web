<script setup lang="ts">
import { ref, reactive } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import router from '@/router';
import { calculator_service } from '@/assets/services/calculator';
import type { Calculator } from '@/assets/interfaces/calculator/ICalculator';
import type { CalculatorSettings } from '@/assets/interfaces/calculator/ICalculatorSettings'
import { user_service } from '@/assets/services/user';
import type { User } from '@/assets/interfaces/user/iUser';
import type { UserSettings } from '@/assets/interfaces/user/iUserSettings';

interface Props {
    id: string
};

const props = defineProps<Props>();

const calculator_res = await calculator_service.get_calculator_by_id(+props.id);
if (calculator_res === false) {
    router.push('/404');
}

const calculator = calculator_res as Calculator;

const curr_user = await user_service.get_profile();
const author = await user_service.get_user(calculator.author_id);
const calc_owner = ref(false);

if ((curr_user as boolean) !== false) {
  calc_owner.value = (curr_user as User).id === calculator.author_id
}
else {
    router.push('/calculators/' + props.id);
}

// console.log(calculator);

const calculatorSettings = reactive(<CalculatorSettings> {
    name: calculator.name,
    description: calculator.description,
    input: calculator.input,
    code: calculator.code,
    is_public: calculator.is_public
})
</script>

<template>
<section id="edit-calc-section">
<div class="section-wrapper">
    <h2>create calculator</h2>
    <label for="">
        <h3>calculator name:</h3>
        <BaseInput v-model="calculatorSettings.name" :width="240" type="text" placehoder="name"></BaseInput>
    </label>
    <label for="">
        <h3>calculator description:</h3>
        <BaseInput v-model="calculatorSettings.description" :width="400" type="text" placehoder="description">{{ calculator.description }}</BaseInput>
    </label>
    <label for="">
        <h3>calculator input format:</h3>
        <BaseInput v-model="calculatorSettings.input" :width="400" type="text" placehoder="input">{{ calculator.input }}</BaseInput>
    </label>

    <h3>calculator code url:</h3>
    <div class="code-wrapper">
        <label for="">
            make code public:
            <BaseInput v-model="calculatorSettings.is_public" :width="24" type="checkbox">{{ calculator.is_public }}</BaseInput>
        </label>
        <label for="">
            <BaseInput v-model="calculatorSettings.code" :width="240" type="url" placehoder="calculator code link">{{ calculator.code }}</BaseInput>
        </label>
    </div>
    <BaseButton @click.prevent="calculator_service.update_calculator(+props.id, calculatorSettings, calculator)" :width="200">Update calculator</BaseButton>
    <BaseButton class="delete_calculator_btn" @click.prevent="calculator_service.delete_calculator(+props.id)" :width="200">Delete calculator</BaseButton>

</div>
</section>
</template>

<style scoped lang="scss">
#edit-calc-section {
    @include base-section();
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    min-height: calc(100vh - 160px);

    .delete_calculator_btn {
        color: red;
    }

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