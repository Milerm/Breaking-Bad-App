import React, { useState } from 'react'
import { Button, Card, CardColumns, Form, InputGroup, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { libraryAddLibrary } from '../../actions/library'
import { useForm } from '../../hooks/useForm'

const initialForm = {
  name: ''
}

export const LibrariesComponent = () => {
  const dispatch = useDispatch()
  const [{ name }, handleInputChange, reset] = useForm(initialForm)
  const {
    library: { libraries, quotes }
  } = useSelector((state) => state)
  const [error, setError] = useState(false)

  const handleAddLibrary = (e) => {
    e.preventDefault()

    if (name.length <= 2) {
      setError(true)
      return
    }

    const newLibrary = {
      id: new Date().getTime(),
      name
    }

    dispatch(libraryAddLibrary(newLibrary))
    setError(false)
    reset()
  }

  return (
    <div>
      <h1>Libraries</h1>

      <Form onSubmit={handleAddLibrary} className="mt-4">
        <Form.Label className="mr-2">Crear nueva librería:</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            name="name"
            onChange={handleInputChange}
            value={name}
            autoComplete="off"
            placeholder="Ingresa aquí el nombre de la librería..."
            className={`${error && 'is-invalid'}`}
          />
          <InputGroup.Append>
            <Button type="submit">
              <i className="fas fa-save" />
            </Button>
          </InputGroup.Append>
          {error && <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>}
        </InputGroup>
      </Form>

      <CardColumns className="mt-3">
        {libraries?.map((library) => (
          <Card key={library.id}>
            <Card.Header>{library.name}</Card.Header>
            <ListGroup variant="flush">
              {quotes
                ?.filter((quote) => quote.library_id === library.id)
                .map((q) => (
                  <ListGroup.Item>{q.quote}</ListGroup.Item>
                ))}
            </ListGroup>
          </Card>
        ))}
      </CardColumns>
    </div>
  )
}
