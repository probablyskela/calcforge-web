<template>
    <section id="not-found">
        <h1>404 Not Found</h1>
    </section>
</template>

<style scoped lang="scss">
#not-found {
    @include base-section();
    display: flex;
    align-items: center;
    min-height: calc(100vh - 160px);
    justify-content: center;

    h1 {
        @include base-text-gradient();
        font-size: 64px;
    }
}
</style>