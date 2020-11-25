import React from 'react'

import { HeaderContainer } from './styles'

function Header({ children, title }) {
  return (
    <>
      <HeaderContainer>
        <h1>🦐</h1>
        <h1>Pitu</h1>
        <p>{children}</p>
      </HeaderContainer>
    </>
  )
}

export default Header