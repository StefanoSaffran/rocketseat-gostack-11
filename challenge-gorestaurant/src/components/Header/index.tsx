import React, { useContext } from 'react';
import Toggle from 'react-toggle';
import { ThemeContext } from 'styled-components';
import { FiPlusSquare } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useTheme } from '../../hooks/theme';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface IHeaderProps {
  openModal: () => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal }) => {
  const { title } = useContext(ThemeContext);

  const { toggleTheme } = useTheme();
  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
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
          <div>
            <button
              type="button"
              onClick={() => {
                openModal();
              }}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
