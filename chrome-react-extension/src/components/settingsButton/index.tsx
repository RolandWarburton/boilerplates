import React from 'react'

type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>

const OptionsButton = () => {
  const handleOpenSettings = (e: MouseEvent) => {
    e.preventDefault()
    chrome.runtime.openOptionsPage()
  }

  return (
    <div>
      <button onClick={handleOpenSettings}>settings</button>
    </div>
  )
}

export { OptionsButton }
