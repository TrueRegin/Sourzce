<template>
    <div class="button-row">
        <slot></slot>
    </div>
</template>

<style lang="sass">
.button-row
    display: grid
    background: #fff3
    gap: $controls-gap
    grid-template-columns: 1fr 1fr
    box-sizing: border-box
</style>
