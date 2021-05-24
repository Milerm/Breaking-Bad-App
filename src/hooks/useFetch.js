import { useEffect, useState } from 'react'

export const useFetch = (url, method = 'GET', body) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [refetchIndex, setRefetchIndex] = useState(0)

  const BASE_URL = 'https://www.breakingbadapi.com/api'
  const refetch = () => setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await fetch(`${BASE_URL}${url}`, { method, body })
        const result = await response.json()

        if (!response.ok) {
          setHasError(true)
        }

        setData(result)
      } catch (error) {
        setHasError(true)
        setErrorMessage(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refetchIndex])

  return {
    data,
    loading,
    hasError,
    errorMessage,
    refetch
  }
}
