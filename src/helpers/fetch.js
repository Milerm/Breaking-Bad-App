const baseUrl = 'https://www.breakingbadapi.com/api'

export const fetchWithoutToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`

  if ('GET' === method) {
    return fetch(url)
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}
