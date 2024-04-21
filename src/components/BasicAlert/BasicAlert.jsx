import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {getIcon} from "../../styles/icons";
import './BasicAlert.css'

const BasicAlert = forwardRef(({warning}, ref) => {
  const [isShow, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    handleAlert: () => {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }));

  const alertClass = `basic-alert ${isShow ? 'active' : 'inactive'}`;

  return (
    <div className={alertClass}>
      <div className="chip__icon">
        {getIcon('bell')}
      </div>
      <p>{warning}</p>
      <div className="chip__close" onClick={() => setShow(false)}>
        {getIcon('wrong')}
      </div>
    </div>
  );
});

export default BasicAlert;
