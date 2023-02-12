import { useEffect, useState } from "react";
import styled from "styled-components";
import { MenuItem } from "../Menu/MenuItem";
import axios from "axios";
import Link from "next/link";
import Loading from "../Loading";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuList, setMenuList] = useState<any[]>();

  const getMenuList = async () => {
    await axios
      .get(`/api/menu`)
      .then(({ data }) => {
        setMenuList(data);
      })
      .catch((e: any) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <>
      <HeaderTag>
        <Link href="/">
          <picture>
            <source srcSet="/images/webp/logo.webp" type="image/webp" />
            <img
              loading="lazy"
              src="/images/png/logo.png"
              alt="Griel Developer"
            />
          </picture>
        </Link>
        <button
          accessKey="m"
          aria-label={menuOpen ? "Abrir o Menu" : "Fechar o Menu"}
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <img
            src={
              menuOpen
                ? "/images/svg/menu-close.svg"
                : "/images/svg/menu-open.svg"
            }
            alt={menuOpen ? "Abrir o Menu" : "Fechar o Menu"}
          />
        </button>
        <Menu className={menuOpen ? "open" : ""}>
          {menuList ? (
            <ul
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              {menuList.map((item, index) => (
                <MenuItem
                  key={index}
                  href={item.href}
                  icon={item.icon}
                  alt={item.alt}
                  strong={item.strong}
                  small={item.small}
                />
              ))}
            </ul>
          ) : (
            <Loading height="100px" width="100px" />
          )}
          <footer>
            <p>Onde me encontrar?</p>
            <div className="icons">
              <a href="linkedin">
                <img src="/images/svg/icon-linkedin.svg" alt="" />
              </a>
              <a href="github">
                <img src="/images/svg/icon-github.svg" alt="" />
              </a>
            </div>
          </footer>
        </Menu>
      </HeaderTag>
    </>
  );
}

const HeaderTag = styled.header`
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 5px var(--space);
  border-bottom: 1px solid var(--blue-1);
  > picture {
    img,
    source {
      height: 35px;
    }
  }
  > button {
    width: 20px;
    height: 20px;
    margin: 0;
    padding: 0%;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transform: scale(0.9);
    transition: 0.5s;
    &:hover {
      transform: scale(1);
      opacity: 0.9;
    }
  }
  @media (min-width: 768px) {
    height: 100px;
    flex-direction: row;
    padding: 0;
    padding-left: var(--space);
    > picture {
      img,
      source {
        height: 65px;
      }
    }
    > button {
      display: none;
    }
  }
`;

const Menu = styled.nav`
  flex-direction: column;
  background-color: rgba(1, 48, 63, 0.75);
  backdrop-filter: blur(5px);
  width: calc(100vw - 23px);
  left: 11px;
  top: 58px;
  overflow: hidden;
  height: 0;
  position: absolute;
  z-index: 2;
  transition: all 1s ease-in;
  justify-content: space-between;
  border-radius: 0 0 var(--space) var(--space);
  &.open {
    overflow: auto;
    height: 370px;
    transition: all 1s ease-out;
    border-bottom: 1px solid var(--blue-1);
    margin-top: 1px;
  }
  ul,
  li {
    margin: 0;
    padding: 0;
    flex-direction: column;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: auto;
    grid-gap: var(--space);
    padding: 5px;
    li {
      min-width: 1em;
      height: 73px;
      a {
        background-color: var(--blue-1);
        padding: var(--space);
        align-items: flex-start;
        border-radius: var(--space);
        min-height: 73px;
        box-shadow: 1px 1px 2px rgb(0 0 0 / 25%);
        img {
          margin-right: var(--space);
          margin-top: var(--space);
          width: 30px;
        }
        div {
          &.wrap {
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            strong,
            small {
              color: var(--white);
            }
            strong {
              font-size: 1em;
            }
            small {
              font-size: 0.95em;
              font-weight: 300;
            }
          }
        }
        &:hover {
          background-color: #0474a3;
        }
      }
    }
  }
  footer {
    border-top: 1px solid var(--blue-1);
    color: var(--white);
    height: 50px;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    padding: var(--space) var(--space);
    div {
      &.icons {
        a {
          img {
            margin-left: var(--space);
          }
        }
      }
    }
  }
  @media only screen and (orientation: landscape) {
    &.open {
      height: calc(100vh - 61px);
    }
  }
  @media (min-width: 768px) {
    display: flex;
    position: relative;
    left: initial;
    top: initial;
    background-color: transparent;
    backdrop-filter: none;
    height: fit-content;
    width: 100%;
    height: 100%;
    border-radius: 0;
    ul,
    li {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding: 0;
      margin: 0;
      grid-gap: unset;
      height: 100%;
    }
    ul {
      li {
        height: initial;
        border-left: 1px solid var(--blue-1);
        align-items: center;
        a {
          flex-direction: column;
          width: 130px;
          background-color: transparent;
          box-shadow: none;
          align-items: center;
          justify-content: center;
          padding: 0;
          border-radius: 0;
          img {
            margin: 0;
            padding: 0;
            height: 50px;
          }
          div {
            &.wrap {
              strong {
                margin: 0;
                padding: 0;
                font-size: 20px;
                font-weight: 100;
              }
              small {
                display: none;
              }
            }
          }
          &:hover {
            background-color: #013646;
          }
          &:last-child {
            border-radius: 0 10px 0 0;
          }
        }
      }
    }
    footer {
      display: none;
    }
    &.open {
      height: 100%;
      border-bottom: none;
    }
  }
`;
