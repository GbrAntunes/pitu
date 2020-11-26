import React, { useState, useEffect } from 'react';
import Header from '../../components/Header'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ShortenerService from '../../services/shortnerService'
import Footer from '../../components/Footer'

import { StatsContainer } from './styles';

const Redirect = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  let { code } = useParams()

  useEffect(() => {
    const service = new ShortenerService()

    service.getLink(code).then(({ url }) => {
      
      setIsLoading(false)
      window.location.replace(url)

    }).catch(err => {
      
      setIsLoading(false)
      setErrorMessage('Ops, a url solicitada não existe.')

    })
  }, [])

  return (
    <>
      <Container>
        { errorMessage ? (
          <>
            <Header>
              Seu novo encurtador de urls
            </Header>
            <StatsContainer className="text-center">
              <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-circle" />
              <p class="m-3">{errorMessage}</p>
              <a className="btn btn-primary" href="/">Encurtar nova URL</a>
            </StatsContainer>
          </>
        ) : (
          <p class="text-center">Redirecionando...</p>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Redirect;
