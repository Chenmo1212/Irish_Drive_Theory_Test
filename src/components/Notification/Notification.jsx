import React, {useEffect, useState} from 'react';
import BasicModal from "../BasicModal/BasicModal";
import {loadFromLocalStorage, saveToLocalStorage} from "../../common/common";

const initializeLocalStorage = () => {
  const isShowNotification = loadFromLocalStorage('appNotification', true, 3600 * 1000 * 24);
  const isCN = loadFromLocalStorage('questionsConfig', {})?.isCN || false;
  return {isCN, isShowNotification};
};

const Notification = () => {
  const [isCN, setIsCN] = useState(false);
  const [isShowNotification, setIsShowNotification] = useState(true);

  useEffect(() => {
    const {isCN, isShowNotification} = initializeLocalStorage();
    setIsCN(isCN);
    setIsShowNotification(isShowNotification);
  }, []);

  const getNotificationContentEN = () => (<>
    <p>All questions on this website have been updated to the <b>latest 2024 version</b> of the question bank.</p>
    <p>Many thanks to <i><b>@Wwwan</b></i> and <i><b>@Melody</b></i> for their support during the update process.</p>
    <p>If you have any other questions, please contact：<a
      href="mailto:chenmo991212@gmail.com">chenmo991212@gmail.com</a></p>
  </>)

  const getNotificationContentCN = () => (<>
    <p>本网站上的所有问题均已更新至题库的<b>2024 年最新版本</b>。</p>
    <p>非常感谢 <i><b>@Wwwan</b></i> 和 <i><b>@Melody</b></i> 在更新过程中的支持。</p>
    <p>如果您还有其他疑问，请联系：<a
      href="mailto:chenmo991212@gmail.com">chenmo991212@gmail.com</a></p>
  </>)

  return (<BasicModal
    title={isCN ? '提醒' : 'Notification'}
    text={isCN ? getNotificationContentCN() : getNotificationContentEN()}
    submitText={isCN ? '确定' : 'Got it!'}
    cancelText={isCN ? '' : ''}
    show={isShowNotification}
    onClose={() => setIsShowNotification(false)}
    onSubmit={() => {
      setIsShowNotification(false);
      saveToLocalStorage('appNotification', false, 3600 * 1000 * 24 * 7);
    }}
    textAlign="left"
  />)
};

export default Notification;
