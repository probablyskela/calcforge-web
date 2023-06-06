<script setup lang="ts">
interface Props {
    width: number,
}

const props = defineProps<Props>()
</script>

<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<style scoped lang="scss">
.button {
    width: v-bind("`${props.width}px`");
    cursor: pointer;
    background-color: transparent;
    border: 1px solid $dark-main;
    padding: 10px 20px;
    color: $dark-main;
    font-size: $base-font-size - $base-font-size-offset;
}
</style>
