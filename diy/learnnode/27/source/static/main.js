(function () {
  function loadJS (url, success) {
    var domScript = document.createElement('script')
    domScript.src = url
    domScript.onload = domScript.onreadystatechange = function () {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        success && success()
        this.onload = this.onreadystatechange = null
        this.parentNode.removeChild(this)
      }
    }
    document.getElementsByTagName('head')[0].appendChild(domScript)
  }

  loadJS('https://static001.geekbang.org/static/time/js/index.9c90638c.js', function () {
    loadJS('https://static001.geekbang.org/static/time/js/chunk-vendors.8d89f1b9.js', function () {
      // loadJS('$app')
    })
  })
})()

