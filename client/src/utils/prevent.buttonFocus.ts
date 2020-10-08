export function preventButtonFocus (root?: HTMLElement) {
    (root || document).querySelectorAll('button').forEach(button => {
        button.addEventListener('click', event => {
            button.focus()
            button.blur()
        })
    })
}
