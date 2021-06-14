class WordCount extends HTMLElement {
  constructor() {
    super()
    const parent = this.parentNode
    const shadow = this.attachShadow({mode: 'open'})
    const text = document.createElement('span')
    const count = `Words: ${this.countWords(parent)}`
    text.textContent = count
    shadow.appendChild(text)

    setInterval(() => {
      const count = `Words: ${this.countWords(parent)}`
      text.textContent = count
    }, 200)
  }

  countWords(node) {
    const text = node.innerText || node.textContent
    return text.split(/\s+/g).length
  }
}

const StreamActions = {
  update(element) {
    const target = document.getElementById(element.target)
    target.innerHTML = ""
    target.append(element.template.content)
  }
}

class StreamElement extends HTMLElement {
  constructor() {
    super()
    StreamActions[this.action](this)
    this.remove()
  }

  get action() {
    return this.getAttribute("action")
  }

  get target() {
    return this.getAttribute("target")
  }

  get template() {
    return this.firstElementChild
  }
}

customElements.define("word-count", WordCount)
customElements.define("turbo-stream", StreamElement)
