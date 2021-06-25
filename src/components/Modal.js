import React from 'react'
import CreateTweet from './CreateTweet';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#15202b',
  padding: '20px',
  zIndex: 1000,
  borderRadius: 20
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, .1)',
  zIndex: 1000
}

export default function Modal({ open, onClose, user }) {
  if (!open) return null

  const getTweets = () => {
    onClose()
  }

  return (
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="close-btn">
          <FontAwesomeIcon style = {{color: '#1ea1f2'}} icon={faTimes} onClick={onClose} />
        </div>
        <div className="Tweet-List">
          <CreateTweet user={user} updateTweets={getTweets} />
        </div>
      </div>
    </>
  )
}