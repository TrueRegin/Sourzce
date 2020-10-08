import { DEV_IP, EXISTS_ROUTE } from '@C'
import Axios from 'axios'

export async function getBaseUrl () {
    const baseUrl = await Axios.get(EXISTS_ROUTE)
        .then((res) => {
            if (res.data && res.data.exists === true) return ''
            return DEV_IP
        })
        .catch(() => {
            return DEV_IP
        })

    return baseUrl
}
