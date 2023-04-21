const DarkMode = {
  init ({ darkModeToggle, currentMode }) {
    this._checkDarkMode(currentMode, darkModeToggle)
    darkModeToggle.addEventListener('click', () => {
      this._changeMode(darkModeToggle)
    })
  },

  _activeteDarkMode (darkModeToggle) {
    document.body.classList.add('darkmode')
    window.localStorage.setItem('darkMode', 'aktif')
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  },
  _disableDarkMode (darkModeToggle) {
    document.body.classList.remove('darkmode')
    window.localStorage.setItem('darkMode', 'null')
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  },
  _checkDarkMode (currentMode, darkModeToggle) {
    if (currentMode === 'aktif') {
      this._activeteDarkMode(darkModeToggle)
    } else {
      this._disableDarkMode(darkModeToggle)
    }
  },
  _changeMode (darkModeToggle) {
    const getMode = window.localStorage.getItem('darkMode')
    if (getMode !== 'aktif') {
      this._activeteDarkMode(darkModeToggle)
    } else {
      this._disableDarkMode(darkModeToggle)
    }
  }
}
export default DarkMode
