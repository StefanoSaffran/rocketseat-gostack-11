import styled, { css, keyframes } from 'styled-components';

interface IFoodPlateProps {
  available: boolean;
}

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div<IFoodPlateProps>`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  margin: 0 10px;

  animation: ${appearFromBottom} 1s;

  & + div {
    margin-top: 25px;
  }

  @media (min-width: 894px) {
    & + div {
      margin: 0;
    }
    img {
      max-width: 420px;
    }
  }

  @media (min-width: 1399px) {
    img {
      max-width: 420px;
    }
  }

  header {
    background: #ffb84d;
    border-radius: 8px 8px 0px 0px;
    height: 192px;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;

    ${props =>
      !props.available &&
      css`
        opacity: 0.3;
      `};

    img {
      pointer-events: none;
      user-select: none;
      max-width: 320px;
    }
  }

  section.body {
    padding: 30px;

    h2 {
      color: ${({ theme }) => theme.colors.text};
    }

    p {
      color: ${({ theme }) => theme.colors.text};

      margin-top: 16px;
    }

    .price {
      font-style: normal;
      font-size: 24px;
      line-height: 34px;
      color: #39b100;

      b {
        font-weight: 600;
      }
    }
  }

  section.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px 30px;
    background: ${({ theme }) => theme.colors.footer};
    border-radius: 0px 0px 8px 8px;

    div.icon-container {
      display: flex;

      button {
        background: ${({ theme }) => theme.colors.background};
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: ${({ theme }) => theme.colors.text};
        }

        & + button {
          margin-left: 6px;
        }
      }
    }

    div.availability-container {
      display: flex;
      align-items: center;

      p {
        color: ${({ theme }) => theme.colors.text};
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 88px;
        height: 32px;
        margin-left: 12px;

        & input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #c72828;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 16px;

          &:before {
            position: absolute;
            content: '';
            height: 20px;
            width: 40px;
            left: 8px;
            bottom: 6px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 10px;
          }
        }

        input:checked + .slider {
          background-color: #39b100;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(32px);
          -ms-transform: translateX(32px);
          transform: translateX(32px);
        }
      }
    }
  }
`;
