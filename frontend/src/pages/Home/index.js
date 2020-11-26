import React, { useState, useRef } from 'react';
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import vars from '../../configs/vars'
import ShortenerService from '../../services/shortnerService'
import Header from '../../components/Header'
import { ContentContainer, Form } from './styles'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [url, setUrl] = useState('')
  const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef(null)

  async function handleSubmit(event) {
    event.preventDefault()

    setIsLoading(true)
    setErrorMessage('')

    if (!url) {
      setIsLoading(false)
      setErrorMessage('Informe uma url para encurtar')

      return
    }

    try {
      const service = new ShortenerService()
      const result = await service.generate({ url })

      setIsLoading(false)
      setCode(result.code)

    } catch (error) {
      setIsLoading(false)
      setErrorMessage('Ops, ocorreu um erro ao tentar encurtar a url.')
    }

  }

  function copyToClipboard() {
    const element = inputRef.current
    console.log(element)

    element.select()

    document.execCommand('copy')
  }

  return (
    <Container>
      <Header>Seu novo encurtador de URL. </Header>
      <ContentContainer>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Digite a url para encurtar"
              defaultValue=""
              onChange={e => setUrl(e.target.value)}
            />
            <InputGroup.Append>
              <Button variant="primary" type="submit">Encurtar</Button>
            </InputGroup.Append>
          </InputGroup>

          {isLoading ? (
            <Spinner animation="border" />
          ) : (
              code && (
                <>
                  <InputGroup className="mb-3">
                    <FormControl
                      autoFocus
                      defaultValue={`${vars.HOST_APP}${code}`}
                      ref={inputRef}
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={() => copyToClipboard()}>Copiar</Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <p>Para acompanhar as estatísticas, acesse {vars.HOST_APP+code}</p>
                </>
              )
            )}

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </Form>
      </ContentContainer>
    </Container>
  );
};

export default Home;
