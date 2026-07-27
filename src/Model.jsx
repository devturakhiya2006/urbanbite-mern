import React from 'react'
import ReactDom from 'react-dom'

const MODEL_STYLES = {
  position: 'fixed',
  top: '90px',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, 0)',
  zIndex: 1000,
  height: '85%',
  width: '90%',
  borderRadius: '12px',
  overflow: 'visible'
}

const CONTENT_STYLES = {
  height: '100%',
  width: '100%',
  overflow: 'auto',
  borderRadius: '12px'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 999
}

const CLOSE_BTN_STYLES = {
  position: 'absolute',
  top: '-18px',
  right: '-18px',
  zIndex: 2000,
  borderRadius: '50%',
  width: '42px',
  height: '42px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
}

export default function Model({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODEL_STYLES}>
        <button className='btn bg-danger fs-5' style={CLOSE_BTN_STYLES} onClick={onClose}> X </button>
        <div style={CONTENT_STYLES}>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('cart-root')
  )
}