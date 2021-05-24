import React, { useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { quoteAddComment, quoteAddQualification } from '../../actions/quote'
import { useFetch } from '../../hooks/useFetch'
import { useForm } from '../../hooks/useForm'
import moment from 'moment'
import ReactStarsRating from 'react-awesome-stars-rating'
import { libraryAddLibrary, libraryAddQuote } from '../../actions/library'
import Swal from 'sweetalert2'

const initialForm = {
  comment: '',
  library: '',
  libraryId: ''
}

export const QuoteComponent = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { data, loading, hasError } = useFetch(`/quotes/${id}`)
  const [{ comment, library, libraryId }, handleInputChange, reset] = useForm(initialForm)
  const {
    library: { libraries, quotes },
    quote: { comments, qualifications }
  } = useSelector((state) => state)
  const [commentsFiltered, setCommentsFiltered] = useState([])
  const [error, setError] = useState(false)
  const [errorBookmark, setErrorBookmark] = useState(false)
  const [errorLibrary, setErrorLibrary] = useState(false)
  const [qualificationHistory, setQualificationHistory] = useState([])
  const [showLibraryModal, setShowLibraryModal] = useState(false)
  const [showAddLibrary, setShowAddLibrary] = useState(false)

  const handleAddComment = (e) => {
    e.preventDefault()

    if (comment.length <= 2) {
      setError(true)
      return
    }

    const newComment = {
      id: new Date().getTime(),
      quote_id: id,
      comment
    }

    dispatch(quoteAddComment(newComment))
    setError(false)
    reset()
  }

  const handleAddToBookmark = (e) => {
    e.preventDefault()

    if (!libraryId) {
      setErrorBookmark(true)
      return
    }

    const libId = Number(libraryId)
    const quId = Number(id)
    const exist = quotes.filter(item => item.library_id === libId && item.quote_id === quId)
    if (exist.length > 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Esta frase ya fue agregada a esta biblioteca',
        icon: 'error'
      })
      return
    }

    const newBookmark = {
      id: new Date().getTime(),
      library_id: libId,
      quote: data[0]?.quote,
      quote_id: quId
    }

    dispatch(libraryAddQuote(newBookmark))

    Swal.fire({
      title: 'Éxito',
      text: 'Frase agregada a la biblioteca exitosamente.',
      icon: 'success'
    })

    setErrorBookmark(false)
    setShowLibraryModal(false)
    reset()
  }

  const handleAddLibrary = (e) => {
    e.preventDefault()

    if (library.length <= 2) {
      setErrorLibrary(true)
      return
    }

    const newLibrary = {
      id: new Date().getTime(),
      name: library
    }

    dispatch(libraryAddLibrary(newLibrary))
    setErrorLibrary(false)
    setShowAddLibrary(false)
    reset()
  }

  const handleClose = () => {
    setShowLibraryModal(false)
    setShowAddLibrary(false)
    reset()
  }

  const saveQualification = (value) => {
    const newQualification = {
      id: new Date().getTime(),
      quote_id: id,
      value
    }

    dispatch(quoteAddQualification(newQualification))
  }

  useEffect(() => {
    let filtered = comments.filter((item) => item.quote_id === id)
    filtered = filtered.sort((a, b) => b.id - a.id)
    setCommentsFiltered(filtered)
  }, [comments])

  useEffect(() => {
    let filtered = qualifications.filter((item) => item.quote_id === id)
    filtered = filtered.sort((a, b) => b.id - a.id)
    setQualificationHistory(filtered)
  }, [qualifications])

  return (
    <>
      <Container>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : hasError ? (
          <p>Error al obtener la frase</p>
        ) : (
          data &&
          data.length >= 0 && (
            <>
              <Card className="mt-3">
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {data[0]?.quote}{' '}
                      <Badge onClick={() => setShowLibraryModal(true)} className="pointer">
                        <i className="fas fa-bookmark" />
                      </Badge>
                    </p>
                    <footer className="blockquote-footer">{data[0]?.author}</footer>
                  </blockquote>
                </Card.Body>
              </Card>

              <Form onSubmit={handleAddComment} className="mt-4">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="mr-2">Calificación:</Form.Label>
                  <ReactStarsRating onChange={saveQualification} />
                </Form.Group>
                <InputGroup hasValidation>
                  <Form.Control
                    name="comment"
                    onChange={handleInputChange}
                    value={comment}
                    autoComplete="off"
                    placeholder="Ingresa aquí tu comentario..."
                    className={`${error && 'is-invalid'}`}
                  />
                  <InputGroup.Append>
                    <Button type="submit">
                      <i className="fas fa-paper-plane" />
                    </Button>
                  </InputGroup.Append>
                  {error && (
                    <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form>

              <Row className="mt-3">
                <Col>
                  <h3>Comentarios</h3>
                  {commentsFiltered?.map((item) => (
                    <Card key={item.id} className="text-right mt-2 mb-2">
                      <blockquote className="blockquote mb-0 card-body">
                        <p>{item.comment}</p>
                        <footer className="blockquote-footer">
                          <small className="text-muted">
                            <cite title="Source Title">{moment(item.id).fromNow()}</cite>
                          </small>
                        </footer>
                      </blockquote>
                    </Card>
                  ))}
                </Col>
                <Col>
                  <h3>Calificaciones</h3>
                  {qualificationHistory.map((item) => (
                    <p key={item.id}>
                      <ReactStarsRating id={item.id} value={item.value} isEdit={false} />
                    </p>
                  ))}
                </Col>
              </Row>
            </>
          )
        )}

        <Modal show={showLibraryModal} onHide={handleClose}>
          <Form onSubmit={handleAddToBookmark}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <label>Librerías</label>
              {!showAddLibrary ? (
                <InputGroup>
                  <Form.Control
                    as="select"
                    name="libraryId"
                    onChange={handleInputChange}
                    value={libraryId}
                    className={`${errorBookmark && 'is-invalid'}`}
                    custom
                  >
                    <option value="">Seleccione...</option>
                    {libraries?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                  <InputGroup.Append>
                    <Button onClick={() => setShowAddLibrary(true)}>
                      <i className="fas fa-plus" />
                    </Button>
                  </InputGroup.Append>
                  {errorBookmark && (
                    <Form.Control.Feedback type="invalid">Campo requerido</Form.Control.Feedback>
                  )}
                </InputGroup>
              ) : (
                <InputGroup hasValidation>
                  <Form.Control
                    name="library"
                    onChange={handleInputChange}
                    value={library}
                    autoComplete="off"
                    placeholder="Nombre de la librería..."
                    className={`${errorLibrary && 'is-invalid'}`}
                  />
                  <InputGroup.Append>
                    <Button onClick={handleAddLibrary}>
                      <i className="fas fa-save" />
                    </Button>
                  </InputGroup.Append>
                  {errorLibrary && (
                    <Form.Control.Feedback type="invalid">
                      Campo requerido y más de 2 caracteres
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </>
  )
}
