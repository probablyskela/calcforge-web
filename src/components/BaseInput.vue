<script setup lang="ts">
interface Props {
    width: number,
    modelValue?: any,
    type?: string,
    placehoder?: string,
    required?: boolean,
};

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placehoder: '',
    required: false
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};
</script>

<template>
    <input class="input"
    :value="modelValue"
    :type="props.type" 
    :placeholder="props.placehoder" 
    :required="props.required"
    @input="updateValue">
</template>

<style scoped lang="scss">

.input {
    width: v-bind("`${props.width}px`");
    height: ($base-font-size - $base-font-size-offset) * 2;
    border: 0;
    border-bottom: 1px solid $dark-main;
    background-color: transparent;
    color: $dark-main;
    font-size: $base-font-size - $base-font-size-offset;

    &:focus-visible{
        outline: none;
    }

    &::placeholder {
        @include fix-text();
        color: $dark-secondary;
    }

    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        cursor: pointer;
        display: inline-block;
        width: $base-font-size / 2 + $base-font-size-offset;
        aspect-ratio: 1;
        margin-left: 10px;
        background:
        linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 43%,$dark-main 45%,$dark-main 55%,rgba(0,0,0,0) 57%,rgba(0,0,0,0) 100%),
        linear-gradient(135deg, transparent 0%,transparent 43%,$dark-main 45%,$dark-main 55%,transparent 57%,transparent 100%);
    }
}
</style>