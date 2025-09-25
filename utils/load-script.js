export default function (src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.onload = () => resolve()
    script.async = true
    script.src = src
    document.head.appendChild(script)
  })
}
