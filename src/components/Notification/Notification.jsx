import React, {useEffect, useState} from 'react';
import BasicModal from "../BasicModal/BasicModal";
import {loadFromLocalStorage, saveToLocalStorage} from "../../common/common";

const initializeLocalStorage = () => {
  const isShowNotification = loadFromLocalStorage('appNotification', true, 3600 * 1000 * 24 * 7);
  const isCN = loadFromLocalStorage('isCN', false);
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
    <p>According to the <a href="https://theorytest.ie/driver-theory-test-updated-for-2024/" rel="noreferrer"
                           target="_blank">RSA</a> website, the Driver Theory Test has been revised and will go live on
      the 1st of July 2024.</p>
    <p><b>Important information for all candidates:</b></p>
    <ol>
      <li><p>Candidates testing <b>BEFORE 1st July 2024</b> should use the June 2019 Edition of the Driver Theory Test
        Questions.</p>
      </li>
      <li><p>Candidates testing <b>AFTER 1st July 2024</b> should use the May 2024 Edition of the Driver Theory Test
        Questions.</p>
      </li>
    </ol>
    <p>Note: The question bank currently used on this website is the driver theory test questions from the <b>June 2019
      version</b>.</p>
    <p>Since the new question bank has just been opened, there are no free question bank resources online.</p>
    <p>If anyone has purchased the official question bank and is willing to provide a new version of question bank
      resources for this website, please contact：<a href="mailto:chenmo991212@gmail.com">chenmo991212@gmail.com</a></p>
  </>)

  const getNotificationContentCN = () => (<>
    <p>据<a href="https://theorytest.ie/driver-theory-test-updated-for-2024/" rel="noreferrer"
            target="_blank">RSA</a>网站报道,驾驶员理论测试已修订，将于 2024 年 7 月 1 日上线。</p>
    <p><b>给所有备考理论驾考的考生的重要信息：</b></p>
    <ol>
      <li><p><b>2024 年 7 月 1 日之前</b>参加考试的考生应使用 2019 年 6 月版的驾驶员理论考试题。</p>
      </li>
      <li><p><b>2024 年 7 月 1 日之后</b>参加考试的考生应使用 2024 年 5 月版的驾驶员理论考试题。</p>
      </li>
    </ol>
    <p>注意：本网站目前使用的题库为 <b>2019 年 6 月版</b>的驾驶员理论考试题。</p>
    <p>由于新题库目前刚刚开放，因此网上并没有免费的题库资源。</p>
    <p>如果有人购买了官方题库，并且有意愿为本网站提供新版本题库资源的朋友请联系：<a
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
