class NavBar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
    <nav>
        <div class="nav-content">
            <a class="nav-brand" href="#">Makan<span>YUKK</span></a>
            <button id="nav-toggle" class="nav-toggle" aria-label="navigation-menu">☰</button>
            <ul id="nav-list" class="nav-list">
                <li class="nav-link">
                    <a href="#">Home</a>
                </li>
                <li class="nav-link">
                    <a href="#/favorite">Favorite</a>
                </li>
                <li class="nav-link">
                    <a href="https://www.instagram.com/bagass_jul/" target="_blank" rel="noopener" >About</a>
                </li>
                <li class="nav-link">
                    <button aria-label="Tombol Darkmode" id="darkmode-button" class="darkmode-button"></button>
                </li>
            </ul>
        </div>
    </nav>`
  }
}
customElements.define('nav-bar', NavBar)
