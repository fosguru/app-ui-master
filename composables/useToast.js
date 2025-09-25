import { useRuntimeConfig, useState } from 'nuxt/app'

export default function useToast () {
  const toasts = useState(() => [])

  const removeToast = (id) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  const addToast = (props) => {
    if (props.dismissible === undefined) { props.dismissible = true }
    if (props.type === undefined) { props.type = 'info' }
    const id = Math.random().toString()
    toasts.value = [...toasts.value, { ...props, id }]
    // remove toast after timeout
    setTimeout(() => {
      removeToast(id)
    }, useRuntimeConfig().public.notificationDelay || 7000)
  }

  return { toasts, addToast, removeToast }
}
