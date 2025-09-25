export default function (appearance = 'system') {
  appearance = appearance.toLowerCase()
  let isDark = false

  if (appearance === 'system') {
    isDark = window?.matchMedia?.('(prefers-color-scheme: dark)').matches
  } else {
    isDark = appearance === 'dark'
  }

  isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
}
