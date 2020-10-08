<template>
    <button :ref='ref' @click="$emit('press')" class='icon-btn' :style="{color, background}">
        <fa :icon='icon'></fa>
        <span class='btn-content'><slot></slot></span>
    </button>
</template>

<script lang="js" src="./ts/IconButton.js">
</script>

<style lang="sass">
.icon-btn
    user-select: none
    // ! Animation
    $btn-t: 120ms
    transition: opacity $btn-t, background $btn-t, box-shadow $btn-t, transform $btn-t, color $btn-t, background $btn-t, font-size $btn-t, padding $btn-t
    transition-timing-function: ease-out

    // # Display
    display: grid
    grid-template-columns: max-content max-content
    gap: 5px
    justify-content: center
    align-content: center

    // # Box Sizing
    box-sizing: border-box
    padding: 9px
    border-radius: 5px

    // ~ Styling
    color: #dfdfdf
    background: #445
    cursor: pointer
    border: 3px solid #dfdfdf
    font-size: 1em

    &:hover
        color: #fff
        transform: translateY(2px)
        background: #3d7
        border-color: #37aa75

    &:focus
        transform: translateY(2px) scale(0.9)
        color: #37aa75
        background: #f3f3f3
        border-color: #37aa75
</style>
