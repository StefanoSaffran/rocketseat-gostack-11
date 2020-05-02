import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Toggle from 'react-toggle';
import { ThemeContext } from 'styled-components';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useTheme } from '../../hooks/theme';
import Logo from '../../assets/logo.svg';

import { Container } from './styles';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { colors, title } = useContext(ThemeContext);

  const { toggleTheme } = useTheme();

  console.log(colors);

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <Toggle
          checked={title === 'dark'}
          onChange={toggleTheme}
          className="toggle"
          icons={{
            checked: <FaMoon color="yellow" size={12} />,
            unchecked: <FaSun color="yellow" size={12} />,
          }}
        />
        <nav>
          <NavLink
            activeStyle={{ borderBottom: `2px solid ${colors.secundary}` }}
            exact
            to="/"
          >
            Listagem
          </NavLink>
          <NavLink
            activeStyle={{ borderBottom: `2px solid ${colors.secundary}` }}
            to="/import"
          >
            Importar
          </NavLink>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
