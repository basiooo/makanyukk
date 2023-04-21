import 'regenerator-runtime' /* for async await transpile */
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import '../styles/style.scss'
import './component/nav-bar'
import './component/footer'

import App from './views/app'
import swRegister from './utils/sw-register'

const app = new App({
  navToggle: document.querySelector('#nav-toggle'),
  navList: document.querySelector('#nav-list'),
  nav: document.querySelector('nav'),
  navContent: document.querySelector('.nav-content'),
  blurLayer: document.querySelector('#blur'),
  darkModeToggle: document.querySelector('#darkmode-button'),
  currentMode: window.localStorage.getItem('darkMode'),
  content: document.querySelector('#main')
})
window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', () => {
  app.renderPage()
  swRegister()
})
