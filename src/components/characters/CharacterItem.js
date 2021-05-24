import React from 'react'
import { Card, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import PropTypes from 'prop-types'

export const CharacterItem = ({ character }) => {
  const { data, loading, hasError } = useFetch(`/quote?author=${character.name}`)

  return (
    <Col>
      <Card className="h-100p">
        <Card.Img variant="top" src={character.img} />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Text as="div">
            {loading ? (
              <Spinner animation="border" variant="primary" />
            ) : hasError ? (
              <span>Error al obtener los datos</span>
            ) : data && data.length > 0 ? (
              <ul>
                {data.map((item) => (
                  <li key={item.quote_id}>
                    <Link to={`/quote/${item.quote_id}`}>{item.quote}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tenemos frases disponibles</p>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

CharacterItem.propTypes = {
  character: PropTypes.object.isRequired
}
