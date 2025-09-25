import pluralize from 'pluralize'
import dayjs from 'dayjs'
import capitalize from 'lodash/capitalize'
import { defineNuxtPlugin } from '#imports'

function time (value, format = 'hh:mmA') {
  return dayjs(`01/01/2000 ${value}`).format(format)
}

function date (value, format = 'M/D/YY @ hh:mmA') {
  return dayjs(value).format(format)
}

function initials (value) {
  if (! value) { return '' }
  const hasTokens = value.includes(' ')
  return value.substring(0, hasTokens ? 1 : 2) + (hasTokens ? value.charAt(value.lastIndexOf(' ') + 1) : '')
}

function currency (value, decimals = 2) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals,
  }).format(value)
}

function amount (value) {
  if (! value || ! value.currency) { return currency(0) }
  return currency(value.amount / 100, value.currency)
}

function bytes (bytes, decimals, kib = true, maxunit) {
  if (bytes === 0) { return '0 Bytes' }
  if (Number.isNaN(Number.parseFloat(bytes)) && ! Number.isFinite(bytes)) { return '' }
  const k = kib ? 1024 : 1000
  const dm = (decimals !== null && ! Number.isNaN(decimals) && decimals >= 0) ? decimals : 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  if (maxunit !== undefined) {
    const index = sizes.indexOf(maxunit)
    if (index !== -1) { i = index }
  }

  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

function truncate (text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
}

function number (value, threshold = 100) {
  // Format numbers with commas for values exceeding the threshold
  if (value == null || value === '' || Number.isNaN(Number(value))) {
    return value
  }

  const num = Number(value)
  if (num > threshold) {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return String(value)
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      f: {
        pluralize,
        capitalize,
        time,
        date,
        initials,
        currency,
        amount,
        bytes,
        truncate,
        number,
      },
    },
  }
})
