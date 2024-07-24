import React from 'react';
import {useNavigate} from "react-router-dom";
import './About.css';
import PageHeader from "../../components/Header/PageHeader";
import {useLang} from "../../store";

const About = () => {
  const {isCN} = useLang();
  const navigate = useNavigate();

  const backHome = () => {
    navigate('/');
  };

  return (
    <div className="about">
      <PageHeader pageTitle={isCN ? '关于' : 'About'}
                  handleBack={backHome}
                  rightIcons={[{name: 'home', action: () => window.open('https://www.chenmo1212.cn', '_blank')}]}
      />

      <div className="content">
        <div className="card">
          <h4>About Little Cookie</h4>

          <p className="english">Hi~, friends from Ireland, welcome to the driving test question bank application
            independently developed by me.</p>
          <p>Hi~, 爱尔兰的小伙伴们，欢迎使用由我独立开发的驾考题库应用。</p>

          <p className="english">When I was preparing for the Irish theoretical driving test, I found that the
            applications in the Internet were not in line with my own use pattern, so I made a website while preparing
            the test. <b>The website itself is free and does not collect any user data.</b></p>
          <p>在备考爱尔兰理论驾考题库时，发现市场上的应用并不符合我自己的使用习惯，于是在刷题的同时，就顺手也做了一个网站。<b>网站本身是免费的，并不会收集任何用户数据。</b>
          </p>

          <p className="english">However, the official(ddt) suddenly announced in June 2024 that the content of the
            question bank would be updated, which will be implemented in July. The official resources of the new
            question bank cost nearly 20 euros.</p>
          <p>但是官方在2024年6月份突如其来宣布更新题库内容，将于7月份开始施行。新题库的官方资源就需要近20欧。</p>

          <p className="english">Fortunately, thanks to the funding from <b>@Melody</b> and the strong assistance
            from <b>@Wwwan</b>, the data on this website can be updated smoothly.</p>
          <p>幸运的是，由于 <b>@Melody</b> 的资助，以及 <b>@万酱</b> 的大力协助，本网站的数据得以顺利更新。</p>

          <p className="english">If you have any questions, please contact me personally. Contact information
            : <a href="mailto:chenmo991212@gmail.com">chenmo991212@gmail.com</a>.</p>
          <p>如果你有任何问题，还务必请与我个人联系。联系方式（Email）：<a
            href="mailto:chenmo991212@gmail.com">chenmo991212@gmail</a>。</p>
          <p className="end name">Chandler</p>
          <p className="end date">2024/07/20</p>
        </div>
      </div>
    </div>
  );
};

export default About;
