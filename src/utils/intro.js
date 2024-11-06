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
