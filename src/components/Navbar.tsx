import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="navigation-w">
      <a href="/" aria-current="page" className="nav__logo-w w-inline-block w--current">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 14 14" fill="none" aria-hidden={true} className="nav__logo">
          <circle cx="12.967" cy="6.90747" r="0.599368" transform="rotate(90 12.967 6.90747)" fill="currentColor"></circle>
          <circle cx="0.599368" cy="0.599368" r="0.599368" transform="matrix(0 1 1 -3.69127e-08 0.226562 6.30811)" fill="currentColor"></circle>
          <circle cx="11.5484" cy="9.54897" r="0.599368" transform="rotate(120 11.5484 9.54897)" fill="currentColor"></circle>
          <circle cx="0.599368" cy="0.599368" r="0.599368" transform="matrix(0.5 0.866025 0.866025 -0.5 1.42578 9.32959)" fill="currentColor"></circle>
          <circle cx="6.89526" cy="6.90748" r="0.885991" transform="rotate(90 6.89526 6.90748)" fill="currentColor"></circle>
          <circle cx="6.89526" cy="12.5852" r="0.885991" transform="rotate(90 6.89526 12.5852)" fill="currentColor"></circle>
          <circle cx="6.89526" cy="1.41456" r="0.885991" transform="rotate(90 6.89526 1.41456)" fill="currentColor"></circle>
          <circle cx="11.5475" cy="4.55259" r="0.599368" transform="rotate(-120 11.5475 4.55259)" fill="currentColor"></circle>
          <circle cx="0.599368" cy="0.599368" r="0.599368" transform="matrix(0.5 -0.866026 -0.866026 -0.5 2.46484 5.37134)" fill="currentColor"></circle>
        </svg>
        <div>Promptedsite</div>
      </a>
      <button aria-label="Mute Audio" data-label="Play audio,Mute audio" aria-pressed="false" type="button" className="sound-w">
        <div>Sound</div>
        <div className="sound__btn">
          <span className="sound__inner">
            <span className="sound__icon">
              <svg className="sound__svg">
                <path d="M0,7.998422235085444 L1,7.997867611135446 L2,7.997835070349152 L3,7.998332579845946 L4,7.999238331949764 L5,8.000330566956382 L6,8.001341867643152 L7,8.002024632331608 L8,8.002211696413765 L9,8.001857260078223 L10,8.001048101701324 L11,7.999982331474115 L12,7.998920887118254 L13,7.998123647231222 L14,7.997785803942078 L15,7.997990073070699 L16,7.998686442410267 L17,7.999704416459723 L18,8.000794759668675 L19,8.001690517992524 L20,8.002172378552926 L21,8.002122365079222 L22,8.001552722614054 L23,8.00060291949987 L24,7.999505500664568 L25,7.998529152512845"></path>
              </svg>
            </span>
          </span>
        </div>
      </button>
      <nav id="main-nav" data-module="menu" aria-label="Main navigation" aria-expanded="false" className="navigation">
        <button id="menu-toggle" aria-label="Open main menu" aria-controls="main-nav" aria-expanded="false" type="button" className="nav__header">
          <a tabIndex={-1} aria-hidden={true} href="/" aria-current="page" className="nav__logo-w mobile w-inline-block w--current">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 14 14" fill="none" aria-hidden={true} className="nav__logo">
              <circle cx="12.967" cy="6.90747" r="0.599368" transform="rotate(90 12.967 6.90747)" fill="currentColor"></circle>
              <circle cx="0.599368" cy="0.599368" r="0.599368" transform="matrix(0 1 1 -3.69127e-08 0.226562 6.30811)" fill="currentColor"></circle>
              <circle cx="11.5484" cy="9.54897" r="0.599368" transform="rotate(120 11.5484 9.54897)" fill="currentColor"></circle>
              <circle cx="0.599368" cy="0.599368" r="0.599368" transform="matrix(0.5 0.866025 0.866025 -0.5 1.42578 9.32959)" fill="currentColor"></circle>
              <circle cx="6.89526" cy="6.90748" r="0.885991" transform="rotate(90 6.89526 6.90748)" fill="currentColor"></circle>
              <circle cx="6.89526" cy="12.5852" r="0.885991" transform="rotate(90 6.89526 12.5852)" fill="currentColor"></circle>
              <circle cx="6.89526" cy="1.41456" r="0.885991" transform="rotate(90 6.89526 1.41456)" fill="currentColor"></circle>
              <circle cx="11.5475" cy="4.55259" r="0.599368" transform="rotate(-120 11.5475 4.55259)" fill="currentColor"></circle>
              <circle cx="0.599368" cy="0.599368" r="0.599368" transform="matrix(0.5 -0.866026 -0.866026 -0.5 2.46484 5.37134)" fill="currentColor"></circle>
            </svg>
            <div>Promptedsite</div>
          </a>
          <div className="menu__label">menu</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 23 16" fill="none" aria-hidden={true} className="nav__burger">
            <circle cx="1.59766" cy="1.6709" r="1.25" fill="currentColor"></circle>
            <circle cx="11.6719" cy="1.6709" r="1.25" fill="currentColor"></circle>
            <circle cx="21.75" cy="1.6709" r="1.25" fill="currentColor"></circle>
            <circle cx="1.59766" cy="14.3301" r="1.25" fill="currentColor"></circle>
            <circle cx="11.6719" cy="14.3301" r="1.25" fill="currentColor"></circle>
            <circle cx="21.75" cy="14.3301" r="1.25" fill="currentColor"></circle>
          </svg>
          <div className="nav__line"></div>
        </button>
        <ul inert={true} role="list" className="nav__list">
          <li className="nav__item"><a data-anchor="0" href="/" aria-current="page" className="nav__link w--current">Home</a></li>
          <li className="nav__item"><a data-anchor="1" href="#" className="nav__link">Sound</a></li>
          <li className="nav__item"><a data-anchor="2" href="#" className="nav__link">Craft</a></li>
          <li className="nav__item"><a data-anchor="4" href="#" className="nav__link">Controls</a></li>
          <li className="nav__item"><a data-anchor="5" href="#" className="nav__link">Power</a></li>
          <li className="nav__item"><a href="/specs" className="nav__link">Specs</a></li>
        </ul>
      </nav>
    </header>
  );
};
