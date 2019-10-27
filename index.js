chrome.runtime.onMessage.addListener(({ type }) => {
  const span = document.createElement('span')
  span.id = 'message'
  span.textContent = type
  document.body.appendChild(span)
})
