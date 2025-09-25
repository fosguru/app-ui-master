import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { defineNuxtPlugin } from '#imports'

function addTooltip (el, binding) {
  if (el.tooltip) { return }
  el.tooltip = document.createElement('span')
  el.tooltip.className = 'absolute z-50 bg-black text-white rounded-lg px-2 py-0.5 text-sm max-w-md transition duration-300 mr-1.5'
  el.tooltip.style.opacity = '0'
  el.tooltip.innerText = binding.value
  document.body.appendChild(el.tooltip)

  const arrowEl = document.createElement('span')
  arrowEl.className = 'absolute h-2 w-2 bg-black rotate-45'
  el.tooltip.appendChild(arrowEl)

  el.cleanup = autoUpdate(el, el.tooltip, async () => {
    const { x, y, middlewareData, placement } = await computePosition(el, el.tooltip, {
      placement: binding.arg || 'top',
      middleware: [offset(12), flip(), shift({ padding: 5 }), arrow({ element: arrowEl, padding: 5 })],
    })
    el.tooltip.style.opacity = '1'
    el.tooltip.style.top = `${y}px`
    el.tooltip.style.left = `${x}px`

    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]]
    const { x: arrowX, y: arrowY } = middlewareData.arrow

    Object.assign(arrowEl.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: '-4px',
    })
  })
}

function removeTooltip (el) {
  if (! el.tooltip) { return }
  el.tooltip.style.opacity = '0'
  const tooltip = el.tooltip
  setTimeout(() => {
    tooltip.remove()
    delete el.tooltip
    el.cleanup()
  }, 300)
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tooltip', {
    mounted (el, binding) {
      if (! binding.value) { return }
      el.addEventListener('mouseover', () => addTooltip(el, binding))
      el.addEventListener('mouseleave', () => removeTooltip(el))
    },
  })
})
