import React from "react";
import sprite from "../../../img/sprite.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container container--max footer__container">
        <p className="footer__copyright">
          &copy; {`${new Date().getFullYear()} `}
          <a href="/" className="footer__copyright__link">
            Gamer's Hub
          </a>
          . All Rights Reserved.
        </p>

        <ul className="footer__social-links">
          <span>Find me on :</span>
          <li className="footer__icon-box">
            <a href="/" className="footer__icon-box__link">
              <svg className="icon icon--white">
                <use xlinkHref={`${sprite}#icon-facebook`} />
              </svg>
            </a>
          </li>
          <li className="footer__icon-box">
            <a href="/" className="footer__icon-box__link">
              <svg className="icon icon--white">
                <use xlinkHref={`${sprite}#icon-twitter`} />
              </svg>
            </a>
          </li>
          <li className="footer__icon-box">
            <a href="/" className="footer__icon-box__link">
              <svg className="icon icon--white">
                <use xlinkHref={`${sprite}#icon-linkedin2`} />
              </svg>
            </a>
          </li>
          <li className="footer__icon-box">
            <a href="/" className="footer__icon-box__link">
              <svg className="icon icon--white">
                <use xlinkHref={`${sprite}#icon-youtube`} />
              </svg>
            </a>
          </li>
          <li className="footer__icon-box">
            <a href="/" className="footer__icon-box__link">
              <svg className="icon icon--white">
                <use xlinkHref={`${sprite}#icon-github`} />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
