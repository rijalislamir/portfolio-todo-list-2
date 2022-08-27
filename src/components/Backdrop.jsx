import React from 'react'

const Backdrop = ({ show, onClose, children }) => {
  return (
    <>
      {show && <div className='backdrop' onClick={() => onClose()}>{children}</div>}
    </>
  )
}

export default Backdrop