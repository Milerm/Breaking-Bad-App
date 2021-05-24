import React, { useState } from 'react'
import { Container, Pagination, Row } from 'react-bootstrap'
import { useFetch } from '../../hooks/useFetch'
import { CharacterItem } from './CharacterItem'

export const CharacterComponent = () => {
  const limit = 5
  const [page, setPage] = useState(1)

  const { data, loading, hasError, refetch } = useFetch(
    `/characters?limit=${limit}&offset=${(page - 1) * limit}`
  )

  const { data: allCharacters } = useFetch('/characters')

  const changePage = (nextPage) => {
    setPage(nextPage)
    refetch()
  }

  let paginationItems = []
  const maxPages = Math.ceil(allCharacters?.length / limit)
  for (let number = 1; number <= maxPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} onClick={() => changePage(number)} active={number === page}>
        {number}
      </Pagination.Item>
    )
  }

  return (
    <div>
      <h1>Characters</h1>
      <Container fluid>
        <Row xs={1}>
          <Pagination className="pagination-center">
            <Pagination.First onClick={() => changePage(1)} disabled={page === 1} />
            <Pagination.Prev onClick={() => changePage(page - 1)} disabled={page === 1} />
            {paginationItems}
            <Pagination.Next onClick={() => changePage(page + 1)} disabled={page === maxPages} />
            <Pagination.Last onClick={() => changePage(maxPages)} disabled={page === maxPages} />
          </Pagination>
        </Row>
        <Row xs={2} sm={3} md={4} lg={5}>
          {loading ? (
            <span>Buscando personajes...</span>
          ) : hasError ? (
            <span>Error al obtener los datos</span>
          ) : data && data.length > 0 ? (
            data.map((item) => <CharacterItem key={item.char_id} character={item} />)
          ) : (
            <p>No tenemos personajes disponibles</p>
          )}
        </Row>
      </Container>
    </div>
  )
}
