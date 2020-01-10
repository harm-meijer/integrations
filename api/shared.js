export const group = (fn, groups) => {
  if (!groups) {
    throw new Error('need to pass groups')
  }
  return (...args) => {
    const key = JSON.stringify(args)
    const existing = groups.get(key)
    if (existing) {
      return existing
    }
    const result = fn(...args)
    groups.set(key, result)
    return result
  }
}
export const makeConfig = token => ({
  headers: {
    accept: '*/*',
    ...(token ? { authorization: `Bearer ${token}` } : {}),
    'content-type': 'application/json',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site'
  },
  mode: 'cors'
})
