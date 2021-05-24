import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Pagination, Row } from 'react-bootstrap'
import { fetchWithoutToken } from '../../helpers/fetch'
import Util from '../../helpers/util'
import { useFetch } from '../../hooks/useFetch'
import { useForm } from '../../hooks/useForm'
import { CharacterItem } from './CharacterItem'

const initialForm = {
  category: 'category',
  text: ''
}

export const CharacterList = () => {
  const limit = 5
  const [{ category, text }, handleInputChange, reset] = useForm(initialForm)
  const [page, setPage] = useState(1)
  const [queryParams, setQueryParams] = useState('?')

  let { data, loading, hasError, refetch } = useFetch(
    `/characters${queryParams}limit=${limit}&offset=${(page - 1) * limit}`
  )

  let { data: allCharacters } = useFetch(`/characters${queryParams}`)
  const [characters, setCharacters] = useState([])
  const [listCharacters, setListCharacters] = useState([])
  const [paginationItems, setPaginationItems] = useState([])
  const [maxPages, setMaxPages] = useState(0)

  const changePage = async (nextPage) => {
    setPage(nextPage)
    await refresh(nextPage)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setPage(1)
    await refresh()
  }

  const refresh = async (nextPage) => {
    const query = !Util.isNullOrUndefinedOrEmpty(text) ? `?${category}=${text}&` : '?'
    setQueryParams(query)
    let response = await fetchWithoutToken(
      `characters${query}limit=${limit}&offset=${(nextPage - 1) * limit}`
    )
    let body = await response.json()
    setCharacters(body)

    response = await fetchWithoutToken(`characters${query}`)
    body = await response.json()
    setListCharacters(body)
  }

  useEffect(() => {
    setCharacters(data)
    setListCharacters(allCharacters)
  }, [data, allCharacters])

  useEffect(() => {
    let pagItems = []
    const mPages = Math.ceil(listCharacters?.length / limit)
    for (let number = 1; number <= mPages; number++) {
      pagItems.push(
        <Pagination.Item key={number} onClick={() => changePage(number)} active={number === page}>
          {number}
        </Pagination.Item>
      )
    }
    setMaxPages(mPages)
    setPaginationItems(pagItems)
  }, [listCharacters])

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
        <Form onSubmit={handleSearch}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control
                as="select"
                name="category"
                onChange={handleInputChange}
                value={category}
                custom
              >
                <option value="category">Category</option>
                <option value="name">Name</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                name="text"
                onChange={handleInputChange}
                value={text}
                placeholder="Ingrese texto a buscar..."
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Button type="submit">
                <i className="fas fa-search" />
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
        <Row xs={2} sm={3} md={4} lg={5}>
          {loading ? (
            <span>Buscando personajes...</span>
          ) : hasError ? (
            <span>Error al obtener los datos</span>
          ) : characters && characters.length > 0 ? (
            characters.map((item) => <CharacterItem key={item.char_id} character={item} />)
          ) : (
            <p>No tenemos personajes disponibles</p>
          )}
        </Row>
      </Container>
    </div>
  )
}
