import DarkMode from '../utils/dark-mode'
import NavInitiator from '../utils/nav-initiator'
import UrlParser from '../routes/url-parser'
import routes from '../routes/routes'

class App {
  constructor ({ navToggle, navList, nav, navContent, blurLayer, darkModeToggle, currentMode, content }) {
    this._navToggle = navToggle
    this._navList = navList
    this._nav = nav
    this._navContent = navContent
    this._blurLayer = blurLayer
    this._darkModeToggle = darkModeToggle
    this._currentMode = currentMode
    this._content = content
    this._initialAppShell()
    this._initialDarkMode()
  }

  _initialAppShell () {
    NavInitiator.init({
      navToggle: this._navToggle,
      navList: this._navList,
      nav: this._nav,
      navContent: this._navContent,
      blurLayer: this._blurLayer
    })
  }

  _initialDarkMode () {
    DarkMode.init({
      darkModeToggle: this._darkModeToggle,
      currentMode: this._currentMode
    })
  }

  async renderPage () {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = routes[url]
    this._content.innerHTML = await page.render()
    await page.afterRender()
  }
}
export default App
