class Footer extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
        <footer>
            <p>Copyright © 2021 - MakanYUKK</p>
        </footer>`
  }
}
customElements.define('footer-custom', Footer)
