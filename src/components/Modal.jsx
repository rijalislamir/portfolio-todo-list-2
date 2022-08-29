import React from 'react'
import Backdrop from './Backdrop'

const Modal = ({ show, onClose, children }) => {
  return (
    <Backdrop show={show} onClose={() => onClose()}>{children}</Backdrop>
  )
}

export default Modal