<template>
     <div id="controls">
          <slot>
              <!-- Insert controls in here to use them -->
          </slot>
     </div>
</template>

<style lang="sass">
#controls
    // ! Variables
    $button-transdur: 300ms

    // # Position
    position: sticky
    top: 0
    z-index: 1

    // # Display
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
    align-items: center
    gap: $controls-gap
    width: 100%

    // # Box Sizing
    box-sizing: border-box
    padding: 20px

    // ~ Colors
    background: #335
    box-shadow: 0 5px 12px #0005

    .button-container
        flex: 1 1 200px
        width: 100%
        margin: 0 20px
        &:hover
            button
                transform: translateY(-10px)
</style>
