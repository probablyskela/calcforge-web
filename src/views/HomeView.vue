<script setup lang="ts">
</script>

<template>
    <section class="home_section">
        <div class="wrapper">
            <h1>unlimited power of calculators</h1>
            <p>no registration needed to start!</p>
        </div>
    </section>
</template>

<style scoped lang="scss">
.home_section {
    @include base-section();
    height: calc(100vh - 160px);

    .wrapper {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    
        h1 {
            @include base-text-gradient();
            font-size: 64px;
            margin-bottom: 32px;
        }

        p {
            font-size: 32px;
        }
    }
}
</style>