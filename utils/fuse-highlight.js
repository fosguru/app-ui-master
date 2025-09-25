import get from 'lodash/get'
import each from 'lodash/each'

export default function (item, openTag = '<span class="bg-blue-200">', closeTag = '</span>') {
  const highlights = {}

  each(item.item, (itm, key) => {
    const match = item.matches.find(m => m.key === key)
    if (! match) {
      highlights[key] = get(item.item, key, itm)
      return
    }

    const text = get(item.item, key)
    const result = []
    const matches = [].concat(match.indices)
    let pair = matches.shift()

    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i)
      if (pair && i === pair[0]) {
        result.push(openTag)
      }
      result.push(char)
      if (pair && i === pair[1]) {
        result.push(closeTag)
        pair = matches.shift()
      }
    }
    highlights[key] = result.join('')
  })

  return highlights
}
