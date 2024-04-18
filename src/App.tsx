import React, { useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import './App.css'

function App() {

  const ref = useRef<HTMLDivElement>(null)

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])


  const handleClick = () => {
    console.log('I was clicked')
  }


  return (
    <div className='container'>
      <div className='my-image' ref={ref}>
        <div className='my-frame'></div>

      </div>
      <button onClick={onButtonClick} >Download</button>

    </div>
  )
}

export default App
