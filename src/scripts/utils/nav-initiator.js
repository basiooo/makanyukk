const NavInitiator = {
  init ({ navToggle, navList, nav, navContent, blurLayer }) {
    navToggle.addEventListener('click', (event) => {
      this._toggleDrawer(event, navList, navToggle, blurLayer)
    })
    blurLayer.addEventListener('click', (event) => {
      this._closeDrawer(event, navList, navToggle, blurLayer)
    })
    window.addEventListener('scroll', () => {
      this._NavColorOnScroll(nav, navContent)
    })
  },

  _toggleDrawer (event, navList, navToggle, blurLayer) {
    event.stopPropagation()
    navList.classList.toggle('nav-list-active')
    navToggle.classList.toggle('nav-toggle-active')
    blurLayer.classList.toggle('blur-active')
  },

  _closeDrawer (event, navList, navToggle, blurLayer) {
    event.stopPropagation()
    navList.classList.remove('nav-list-active')
    navToggle.classList.remove('nav-toggle-active')
    blurLayer.classList.remove('blur-active')
  },

  _NavColorOnScroll (nav, navContent) {
    const position = document.documentElement.scrollTop
    if (position >= 55) {
      nav.classList.add('nav-active')
      navContent.classList.add('nav-content-active')
    } else {
      nav.classList.remove('nav-active')
      navContent.classList.remove('nav-content-active')
    }
  }
}
export default NavInitiator
