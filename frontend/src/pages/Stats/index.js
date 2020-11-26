import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom'
import { parseISO, formatRelative } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import vars from '../../configs/vars'
import Header from '../../components/Header'
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';

import ShortenerService from '../../services/shortnerService'

const Stats = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [shortenedUrl, setShortenedUrl] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  let { code } = useParams()

  useEffect(() => {
    const service = new ShortenerService()

    setIsLoading(true)

    service.getStats(code).then(response => {

      setIsLoading(false)
      
      const parsedDate = parseISO(response.updatedAt)
      const currentDate = new Date()
      
      const relativeDate = formatRelative(parsedDate, currentDate, {
        locale: ptBR,
      })

      setShortenedUrl(response)
      shortenedUrl.relativeDate = relativeDate
    }).catch(err => {
      console.error(err)
      setIsLoading(false)
      setErrorMessage('Ops, a url digitada não existe.')
    })
  }, [])

  return (
    <Container>
      <Header>Estatísticas</Header>
      { errorMessage ? (

        <StatsContainer className="text-center">
          <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-circle" />
          <p className="m-3">{errorMessage}</p>
          <a className="btn btn-primary" href="/">Encurtar nova URL</a>
        </StatsContainer>

      ) : (
          <StatsContainer className="text-center">
            <p><b>{vars.HOST_APP+shortenedUrl.code}</b></p>
            <p>Redireciona para:<br />{shortenedUrl.url} </p>
            <StatsRow>

              <StatsBox>
                <b>{shortenedUrl.hits}</b>
                <StatsBoxTitle>Visitas</StatsBoxTitle>
              </StatsBox>

              <StatsBox>
                <b>{shortenedUrl.relativeDate}</b>
                <StatsBoxTitle>Última visita {shortenedUrl.relativeDate}</StatsBoxTitle>
              </StatsBox>

            </StatsRow>

            <a className="btn btn-primary" href="/">Encurtar nova URL</a>
          </StatsContainer>
        )}
    </Container>
  );
};

export default Stats;
