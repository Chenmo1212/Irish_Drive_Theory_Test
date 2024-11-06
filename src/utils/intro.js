import introJs from 'intro.js';

export function setHomeIntro(isCN = true, setIntroFinished) {
  introJs()
    .setOptions({
      steps: [
        {
          title: isCN ? "欢迎来到 Little Cookies" : 'Welcome',
          intro: isCN
            ? "👋 欢迎来到 Little Cookies，这里是爱尔兰理论考试的学习平台。"
            : "👋 Welcome to Little Cookies, this is the platform of Irish Theory Exam."
        },
        {
          element: ".home .question_type",
          title: isCN ? "题库总数" : "Total Questions",
          intro: isCN
            ? "这里显示当前题库中的总题数，你可以了解有多少题目可供练习。"
            : "Here is the total number of questions in the current database, you can understand how many questions are available for practice."
        },
        {
          element: ".home .progress",
          title: isCN ? "刷题进度" : "Practice Progress",
          intro: isCN
            ? "这里显示你的刷题进度，你可以了解还剩多少题目未练习。"
            : "Here is the progress of your practice, you can understand how many questions you have left to practice."
        },
        {
          element: ".home .begin",
          title: isCN ? "开始练习" : "Start Practice",
          intro: isCN
            ? "点击“开始”按钮，可以进入正式练习模式，开始做题。"
            : "Click the “Start” button to enter the practice mode, and begin practice."
        },
        {
          element: ".home .mock-exam",
          title: isCN ? "模拟考试" : "Mock Exam",
          intro: isCN
            ? "点击“模拟考试”按钮，进行仿真考试，检验你的学习成果。"
            : "Click the “Mock Exam” button to simulate the exam, check your learning results."
        },
        {
          element: ".layout .i-about",
          title: isCN ? "关于页面" : "About Page",
          intro: isCN
            ? "这是关于页面，你可以在此查看网站成立的相关背景"
            : "Here is the About page, you can view the background of the website."
        },
        {
          element: ".layout .i-settings",
          title: isCN ? "设置页面" : "Settings Page",
          intro: isCN
            ? "这里是前往设置页面的入口，点击前往设置页面对网站进行设置。"
            : "Here is the entrance to the Settings page, click to go to the Settings page to set the website."
        },
        {
          element: ".home",
          title: isCN ? "用户指导完成" : "User Guide Completed",
          intro: isCN
            ? "恭喜你完成了该页面的用户指导，祝一切顺利。"
            : "Congratulations on completing the user guide for this page, have a good day."
        }
      ],
    })
    .setOptions({
      tooltipClass: 'intro-guide',
      exitOnEscKey: true
    })
    .oncomplete(function () {
      setIntroFinished("isHomeIntro", true);
    })
    .start();
}

export function setMineIntro(isCN = true, setIntroFinished) {
  introJs()
    .setOptions({
      steps: [
        {
          title: isCN ? "欢迎来到 Little Cookies" : 'Welcome',
          intro: isCN
            ? "👋 欢迎来到 Little Cookies 的设置页面，这里你可以对网站进行全局设置。"
            : "👋 Welcome to the settings page of Little Cookies, here you can set the website globally."
        },
        {
          element: ".settings .item-language",
          title: isCN ? "语言设置" : "Language Settings",
          intro: isCN
            ? "这里可以设置题库网站的显示语言，目前仅支持中文和英文。"
            : "Here you can set the display language of the website, currently only supports Chinese and English."
        },
        {
          element: ".settings .item-clear",
          title: isCN ? "清除数据" : "Clear Data",
          intro: isCN
            ? "这里可以清除网站的所有用户数据，包括用户的错题和题目收藏数据。"
            : "Here you can clear all data of the website, including user's incorrect questions and favorite question data."
        },
        {
          element: ".settings .item-feedback",
          title: isCN ? "反馈与建议" : "Feedback and Suggestions",
          intro: isCN
            ? "这里可以给网站发送反馈与建议，帮助我们改进网站。"
            : "Here you can send feedback and suggestions to the website, help us improve the website."
        },
        {
          element: ".settings .item-coffee",
          title: isCN ? "买杯咖啡" : "Buy me a coffee",
          intro: isCN
            ? "如果你觉得网站不错，可以在这里帮我买杯咖啡支持一下，你的支持是我维护和更新的动力。"
            : "If you think the website is good, you can buy me a coffee here to support. Your support is the power of my maintenance and update."
        },
        {
          title: isCN ? "用户指导完成" : "User Guide Completed",
          intro: isCN
            ? "恭喜你完成了该页面的用户指导，祝一切顺利。"
            : "Congratulations on completing the user guide for this page, have a good day."
        }
      ],
    })
    .setOptions({
      tooltipClass: 'intro-guide',
      exitOnEscKey: true
    })
    .oncomplete(function () {
      setIntroFinished("isMineIntro", true);
    })
    .start();
}