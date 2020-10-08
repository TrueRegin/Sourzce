import { Notyf } from 'notyf'

const notyf = new Notyf({
    position: {
        x: 'center',
        y: 'bottom'
    },
    dismissible: true,
    ripple: true
})

export function getNotyf () {
    return notyf
}
