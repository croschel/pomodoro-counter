import React from 'react'
import { Timer, Scroll } from 'phosphor-react'
import logoImg from '../../assets/logo-ignite.svg'
import { HeaderContainer } from './styles'
import { NavLink } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <img src={logoImg} alt="" />
      <nav>
        <NavLink to="/">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}

export default Header
