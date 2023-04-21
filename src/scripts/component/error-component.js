class ErrorComponent extends HTMLElement {
  // eslint-disable-next-line accessor-pairs
  set errorMessage (message) {
    this._message = message
    this.render()
  }

  render () {
    this.innerHTML = `
        <img class="error-image" src="images/error-image.png">
        <div class="error-message">
            <h5>${this._message}</h5>
        </div>
        <button onClick="window.location.reload()"  class="error-refresh-button">Refresh</button>
       `
  }
}
customElements.define('error-component', ErrorComponent)
