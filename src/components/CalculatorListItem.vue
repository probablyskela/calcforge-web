<script setup lang="ts">
import router from '@/router';
import { reactive } from 'vue';
import { calculator_service } from '@/assets/services/calculator';
import { RouterLink } from 'vue-router';
import type { Calculator } from '@/assets/interfaces/calculator/ICalculator';
interface Props {
    id: number
};

const props = defineProps<Props>();

const res = await calculator_service.get_calculator_by_id(props.id);
if (res === false) {
    router.push('/404');
}
const calculator = reactive(res as Calculator);
</script>

<template>
    <div class="calculator">
        <RouterLink :to="`/calculators/${calculator.id}`">{{ calculator.name }}</RouterLink>
        <p class="calculator-description">{{ calculator.description }}</p>
    </div>
</template>

<style scoped lang="scss">
.calculator {
    padding: 10px 10px;
    width: 98%;
    border-bottom: 1px solid $dark-main;
    text-align: left;
}

a {
    font-weight: bold;
    text-decoration: underline;
}

.calculator-description {
    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200ch;
    color: $dark-secondary;
    font-size: 17px;
}
</style>