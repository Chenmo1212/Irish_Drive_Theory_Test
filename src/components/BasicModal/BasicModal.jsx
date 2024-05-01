import React from 'react';
import './BasicModal.css'
import {getIcon} from "../../styles/icons";

const BasicModal = ({
                      title = 'Title',
                      text = 'text',
                      show = false,
                      submitText = 'Submit',
                      cancelText = 'Cancel',
                      onClose = () => {
                      },
                      onSubmit = () => {
                      }
                    }) => {

  if (!show) return null

  return (<div className="modal">
    <div className="bg" onClick={onClose}></div>
    <div className="container a-fadeinB">
      <div className="close-icon" onClick={onClose}>
        {getIcon('wrong')}
      </div>

      <div className="title"><span>{title}</span></div>

      <div className="content">
        <div className="text">{text}</div>
        <div className="btn-group">
          <div className="btn submit" onClick={onSubmit}>
            <span>{submitText}</span>
          </div>
          <div className="btn" onClick={onClose}>
            <span>{cancelText}</span>
          </div>
        </div>
      </div>
    </div>
  </div>)
};

export default BasicModal;
