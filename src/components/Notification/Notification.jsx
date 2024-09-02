import React from 'react';
import BasicModal from "../BasicModal/BasicModal";
import {useLang, useNotification} from "../../store/config.store";

const Notification = () => {
  const {isCN} = useLang();
  const {isNotification, isExpired, update} = useNotification();

  const getNotificationContentEN = () => (<>
    <p>Thank you all for your continued support! In the past ten days, the number of visits to the website has exceeded
      &nbsp;<b>10K+</b>, which has put a lot of pressure on the server.</p>
    <p>In order to better maintain and optimize the website, we sincerely hope that everyone can support us through the
      appreciation button.</p>
    <p>Your encouragement will be an important motivation for us to move forward and continue to improve. <b>Without
      your
      help, this kind of traffic may affect the normal operation of the website. </b>Thank you again for your
      understanding
      and support!</p>
    <p>If you have any other questions, please contact：<a
      href="mailto:chenmo991212@gmail.com">chenmo991212@gmail.com</a></p>
  </>)

  const getNotificationContentCN = () => (<>
    <p>感谢大家一直以来的支持！在过去的十天里，网站的访问量已经突破&nbsp;<b>10K+</b>，这对服务器带来了不小的压力。</p>
    <p>为了能够更好地维护和优化网站，我们诚挚地希望大家可以通过赞赏按钮给予支持。</p>
    <p>您的鼓励将成为我们继续前行、持续改进的重要动力。<b>没有大家的帮助，这样的访问量可能会影响网站的正常运行</b>，再次感谢大家的理解与支持！
    </p>
    <p>如果您还有其他疑问，请联系：<a
      href="mailto:chenmo991212@gmail.com">chenmo991212@gmail.com</a></p>
  </>)

  return (<BasicModal
    title={isCN ? '提醒' : 'Notification'}
    text={isCN ? getNotificationContentCN() : getNotificationContentEN()}
    submitText={isCN ? '买杯咖啡' : 'Buy me a coffee!'}
    cancelText={isCN ? '' : ''}
    show={isExpired() || isNotification}
    onClose={() => update(false)}
    onSubmit={() => {
      window.open("https://www.buymeacoffee.com/chenmo", "_blank");
      update(false)
    }}
    textAlign="left"
  />)
};

export default Notification;
