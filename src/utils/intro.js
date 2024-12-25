import introJs from 'intro.js';

export function setHomeIntro(isCN = true, setIntroFinished) {
  introJs()
    .setOptions({
      steps: [
        {
          title: isCN ? "欢迎来到 Little Cookies" : "Welcome",
          intro: "<p class='english'>👋 Welcome to Little Cookies, this is the platform of Irish Theory Exam.</p>" +
            "<p class='chinese'> 欢迎来到 Little Cookies，这里是爱尔兰理论考试的学习平台。</p>"
        },
        {
          element: ".home .question_type",
          title: isCN ? "题库总数" : "Total Questions",
          intro: "<p class='english'>Here is the total number of questions in the current database, you can understand how many questions are available for practice.</p>" +
            "<p class='chinese'>这里显示当前题库中的总题数，你可以了解有多少题目可供练习。</p>"
        },
        {
          element: ".home .progress",
          title: isCN ? "刷题进度" : "Practice Progress",
          intro: "<p class='english'>Here is the progress of your practice, you can understand how many questions you have left to practice.</p>" +
            "<p class='chinese'>这里显示你的刷题进度，你可以了解还剩多少题目未练习。</p>"
        },
        {
          element: ".home .begin",
          title: isCN ? "开始练习" : "Start Practice",
          intro: "<p class='english'>Click the “Start” button to enter the practice mode, and begin practice.</p>" +
            "<p class='chinese'>点击“开始”按钮，可以进入正式练习模式，开始做题。</p>"
        },
        {
          element: ".home .mock-exam",
          title: isCN ? "模拟考试" : "Mock Exam",
          intro: "<p class='english'>Click the “Mock Exam” button to simulate the exam, check your learning results.</p>" +
            "<p class='chinese'>点击“模拟考试”按钮，进行仿真考试，检验你的学习成果。</p>"
        },
        {
          element: ".layout .icon-about",
          title: isCN ? "关于页面" : "About Page",
          intro: "<p class='english'>Here is the About page, you can view the background of the website.</p>" +
            "<p class='chinese'>这是关于页面，你可以在此查看网站成立的相关背景。</p>"
        },
        {
          element: ".layout .icon-settings",
          title: isCN ? "设置页面" : "Settings Page",
          intro: "<p class='english'>Here is the entrance to the Settings page, click to go to the Settings page to set the website.</p>" +
            "<p class='chinese'>这里是前往设置页面的入口，点击前往设置页面对网站进行设置。</p>"
        },
        {
          element: ".home",
          title: isCN ? "用户指导完成" : "User Guide Completed",
          intro: "<p class='english'>Congratulations on completing the user guide for this page, have a good day.</p>" +
            "<p class='chinese'>恭喜你完成了该页面的用户指导，祝一切顺利。</p>"
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
          title: isCN ? "欢迎来到 Little Cookies" : "Welcome",
          intro: "<p class='english'>👋 Welcome to the settings page of Little Cookies, here you can set the website globally.</p>" +
            "<p class='chinese'>👋 欢迎来到 Little Cookies 的设置页面，这里你可以对网站进行全局设置。</p>"
        },
        {
          element: ".settings .item-language",
          title: isCN ? "语言设置" : "Language Settings",
          intro: "<p class='english'>Here you can set the display language of the website, currently only supports Chinese and English.</p>" +
            "<p class='chinese'>这里可以设置题库网站的显示语言，目前仅支持中文和英文。</p>"
        },
        {
          element: ".settings .item-clear",
          title: isCN ? "清除数据" : "Clear Data",
          intro: "<p class='english'>Here you can clear all data of the website, including user's incorrect questions and favorite question data.</p>" +
            "<p class='chinese'>这里可以清除网站的所有用户数据，包括用户的错题和题目收藏数据。</p>"
        },
        {
          element: ".settings .item-feedback",
          title: isCN ? "反馈与建议" : "Feedback and Suggestions",
          intro: "<p class='english'>Here you can send feedback and suggestions to the website, help us improve the website.</p>" +
            "<p class='chinese'>这里可以给网站发送反馈与建议，帮助我们改进网站。</p>"
        },
        {
          element: ".settings .item-coffee",
          title: isCN ? "买杯咖啡" : "Buy me a coffee",
          intro: "<p class='english'>If you think the website is good, you can buy me a coffee here to support. Your support is the power of my maintenance and update.</p>" +
            "<p class='chinese'>如果你觉得网站不错，可以在这里帮我买杯咖啡支持一下，你的支持是我维护和更新的动力。</p>"
        },
        {
          title: isCN ? "用户指导完成" : "User Guide Completed",
          intro: "<p class='english'>Congratulations on completing the user guide for this page, have a good day.</p>" +
            "<p class='chinese'>恭喜你完成了该页面的用户指导，祝一切顺利。</p>"
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

export function setQuestionIntro(isCN = true, setIntroFinished, handleIntroAfterClose) {
  introJs()
    .setOptions({
      steps: [
        {
          title: isCN ? "欢迎来到 Little Cookies" : "Welcome",
          intro: "<p class='english'>👋 Welcome to the question page of Little Cookies.</p>" +
            "<p class='chinese'>👋 欢迎来到 Little Cookies 的答题页面。</p>"
        },
        {
          element: ".question .icon-return",
          title: isCN ? "返回上一页" : "Return to Previous Page",
          intro: "<p class='english'>Click here to return to the previous page.</p>" +
            "<p class='chinese'>点击这里返回到上一页。</p>"
        },
        {
          element: ".question .icon.language",
          title: isCN ? "切换语言" : "Switch Language",
          intro: "<p class='english'>Click here to switch the language of the page.</p>" +
            "<p class='chinese'>点击这里将页面切换到其他语言。</p>"
        },
        {
          element: ".question .icon.fav",
          title: isCN ? "标记为收藏" : "Mark as Favorite",
          intro: "<p class='english'>Click here to mark this question as a favorite, so that it can be reviewed later.</p>" +
            "<p class='chinese'>点击这里将此题标记为收藏，便于稍后复习。</p>"
        },
        {
          element: ".question .question-type",
          title: isCN ? "问题类别" : "Question Type",
          intro: "<p class='english'>Here shows the current question type, help you understand the category of the question.</p>" +
            "<p class='chinese'>这里显示当前问题的类别，帮助你了解题目所属类别。</p>"
        },
        {
          element: ".question .question-num",
          title: isCN ? "问题序号" : "Question Number",
          intro: "<p class='english'>Here shows the current question number and total number of questions, help you track your progress.</p>" +
            "<p class='chinese'>这里显示当前题目的序号和总题数，方便你跟踪进度。</p>"
        },
        {
          element: ".question .question-text",
          title: isCN ? "问题内容" : "Question Content",
          intro: "<p class='english'>This is the question content, carefully read and select the correct answer.</p>" +
            "<p class='chinese'>这是问题的内容，请仔细阅读后选择正确的答案。</p>"
        },
        {
          element: ".question .options",
          title: isCN ? "可选答案" : "Available Options",
          intro: "<p class='english'>Here are the available options, click one option to select your answer.</p>" +
            "<p class='chinese'>这里是可选答案，点击一个选项来选择你的答案。</p>"
        },
        {
          element: ".question .answer",
          title: isCN ? "答案解析" : "Answer Explanation",
          intro: "<p class='english'>Here is the answer explanation, help you understand the meaning of the answer.</p>" +
            "<p class='chinese'>这里是答案解析，可以帮助你理解答案的含义。</p>"
        },
        {
          element: ".question .icon.check",
          title: isCN ? "自动检查" : "Auto Check",
          intro: "<p class='english'>Enabling this button will automatically display the answer explanation and check the answer after each selection.</p>" +
            "<p class='chinese'>开启这个按钮将在每次选择选项后自动显示答案解析并检查答案。</p>"
        },
        {
          element: ".question .icon.stick",
          title: isCN ? "固定解析" : "Stick Explanation",
          intro: "<p class='english'>Enabling this button will fix the answer explanation.</p>" +
            "<p class='chinese'>开启这个按钮将固定显示答案解析。</p>"
        },
        {
          element: ".question .question-footer",
          title: isCN ? "题目操作" : "Question Footer",
          intro: "<p class='english'>Use these buttons to view questions, view the answer, or change questions.</p>" +
            "<p class='chinese'>使用这些按钮来查看题库、查看答案或者更换题目。</p>"
        },
        {
          title: isCN ? "用户指导完成" : "User Guide Completed",
          intro: "<p class='english'>Congratulations on completing the user guide for this page, have a good day.</p>" +
            "<p class='chinese'>恭喜你完成了该页面的用户指导，祝一切顺利。</p>"
        }
      ],
    })
    .setOptions({
      tooltipClass: 'intro-guide',
      exitOnEscKey: true
    })
    .oncomplete(function () {
      setIntroFinished("isQuestionIntro", true);
    })
    .onexit(function () {
      setIntroFinished("isQuestionIntro", false);
      handleIntroAfterClose();
    })
    .start();
}

export function setOverviewIntro(isCN = true, setIntroFinished, handleIntroAfterClose) {
  introJs()
    .setOptions({
      steps: [
        {
          title: isCN ? "欢迎来到 Little Cookies" : "Welcome",
          intro: "<p class='english'>👋 Welcome to the overview page of Little Cookies.</p>" +
            "<p class='chinese'>👋 欢迎来到 Little Cookies 的总览页面。</p>"
        },
        {
          element: ".exam-result.mock .circle.icon-return",
          title: isCN ? "返回主页" : "Return to Homepage",
          intro: "<p class='english'>Click here to return to the Homepage.</p>" +
            "<p class='chinese'>点击这里返回主页。</p>"
        },
        {
          element: ".exam-result .chart",
          title: isCN ? "考试分数" : "Exam Score",
          intro: "<p class='english'>Here shows the exam score.</p>" +
            "<p class='chinese'>这里显示考试分数。</p>"
        },
        {
          element: ".exam-result .result",
          title: isCN ? "考试结果" : "Exam Result",
          intro: "<p class='english'>Here shows the exam result, PASS is passed, and FAIL is not passed.</p>" +
            "<p class='chinese'>这里显示考试结果, PASS为通过，FAIL为未通过。</p>"
        },
        {
          element: ".exam-result .time",
          title: isCN ? "考试用时" : "Exam Time",
          intro: "<p class='english'>Here shows the exam time.</p>" +
            "<p class='chinese'>这里显示考试用时。</p>"
        },
        {
          element: ".exam-result .line-chart",
          title: isCN ? "考试历史" : "Exam Histories",
          intro: "<p class='english'>Here shows the line chart of the history of exam scores.</p>" +
            "<p class='chinese'>这里显示历史考试历史分数绘制的折线图。</p>"
        },
        {
          element: ".exam-result .check-btn",
          title: isCN ? "检查错题" : "Check Incorrect Answers",
          intro: "<p class='english'>Click here to check the wrong questions in this exam.</p>" +
            "<p class='chinese'>点击这里本次考试的错题。</p>"
        },
        {
          element: ".exam-result .save-btn",
          title: isCN ? "收藏错题" : "Favorite Incorrect Answers",
          intro: "<p class='english'>Click here to save all wrong questions in this exam.</p>" +
            "<p class='chinese'>点击这里收藏本次考试的所有错题。</p>"
        },
        {
          title: isCN ? "用户指导完成" : "User Guide Completed",
          intro: "<p class='english'>Congratulations on completing the user guide for this page, have a good day.</p>" +
            "<p class='chinese'>恭喜你完成了该页面的用户指导，祝一切顺利。</p>"
        }
      ],
    })
    .setOptions({
      tooltipClass: 'intro-guide',
      exitOnEscKey: true
    })
    .oncomplete(function () {
      setIntroFinished("isOverviewIntro", true);
    })
    .onexit(function () {
      setIntroFinished("isOverviewIntro", false);
      handleIntroAfterClose();
    })
    .start();
}

export function setExamResultIntro(isCN = true, setIntroFinished, handleIntroAfterClose) {
  introJs()
    .setOptions({
      steps: [
        {
          title: isCN ? "欢迎来到 Little Cookies" : "Welcome",
          intro: "<p class='english'>👋 Welcome to the exam result page of Little Cookies.</p>" +
            "<p class='chinese'>👋 欢迎来到 Little Cookies 的考试结果页面。</p>"
        },
        {
          element: ".exam-result.mock .circle.icon-return",
          title: isCN ? "返回主页" : "Return to Homepage",
          intro: "<p class='english'>Click here to return to the Homepage.</p>" +
            "<p class='chinese'>点击这里返回主页。</p>"
        },
        {
          element: ".exam-result .chart",
          title: isCN ? "考试分数" : "Exam Score",
          intro: "<p class='english'>Here shows the exam score.</p>" +
            "<p class='chinese'>这里显示考试分数。</p>"
        },
        {
          element: ".exam-result .result",
          title: isCN ? "考试结果" : "Exam Result",
          intro: "<p class='english'>Here shows the exam result, PASS is passed, and FAIL is not passed.</p>" +
            "<p class='chinese'>这里显示考试结果, PASS为通过，FAIL为未通过。</p>"
        },
        {
          element: ".exam-result .time",
          title: isCN ? "考试用时" : "Exam Time",
          intro: "<p class='english'>Here shows the exam time.</p>" +
            "<p class='chinese'>这里显示考试用时。</p>"
        },
        {
          element: ".exam-result .line-chart",
          title: isCN ? "考试历史" : "Exam Histories",
          intro: "<p class='english'>Here shows the line chart of the history of exam scores.</p>" +
            "<p class='chinese'>这里显示历史考试历史分数绘制的折线图。</p>"
        },
        {
          element: ".exam-result .check-btn",
          title: isCN ? "检查错题" : "Check Incorrect Answers",
          intro: "<p class='english'>Click here to check the wrong questions in this exam.</p>" +
            "<p class='chinese'>点击这里本次考试的错题。</p>"
        },
        {
          element: ".exam-result .save-btn",
          title: isCN ? "收藏错题" : "Favorite Incorrect Answers",
          intro: "<p class='english'>Click here to save all wrong questions in this exam to the overview page of questions, you can view it in the overview page of questions.</p>" +
            "<p class='chinese'>点击这里收藏本次考试的所有错题到题目预览中，你可以在题目预览中查看。</p>"
        },
        {
          title: isCN ? "用户指导完成" : "User Guide Completed",
          intro: "<p class='english'>Congratulations on completing the user guide for this page, have a good day.</p>" +
            "<p class='chinese'>恭喜你完成了该页面的用户指导，祝一切顺利。</p>"
        }
      ],
    })
    .setOptions({
      tooltipClass: 'intro-guide',
      exitOnEscKey: true
    })
    .oncomplete(function () {
      setIntroFinished("isExamResultIntro", true);
    })
    .onexit(function () {
      setIntroFinished("isExamResultIntro", false);
      handleIntroAfterClose();
    })
    .start();
}
