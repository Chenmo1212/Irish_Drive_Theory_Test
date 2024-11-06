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
          element: ".layout .icon-about",
          title: isCN ? "关于页面" : "About Page",
          intro: isCN
            ? "这是关于页面，你可以在此查看网站成立的相关背景"
            : "Here is the About page, you can view the background of the website."
        },
        {
          element: ".layout .icon-settings",
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

export function setQuestionIntro(isCN = true, setIntroFinished) {
  introJs()
    .setOptions({
      steps: [
        {
          title: isCN ? "欢迎来到 Little Cookies" : 'Welcome',
          intro: isCN
            ? "👋 欢迎来到 Little Cookies 的答题页面。"
            : "👋 Welcome to the question page of Little Cookies."
        },
        {
          element: ".question .icon-return",
          title: isCN ? "返回上一页" : "Return to Previous Page",
          intro: isCN
            ? "点击这里返回到上一页。"
            : "Click here to return to the previous page."
        },
        {
          element: ".question .icon.language",
          title: isCN ? "切换语言" : "Switch Language",
          intro: isCN
            ? "点击这里将页面切换到其他语言。"
            : "Click here to switch the language of the page."
        },
        {
          element: ".question .icon.fav",
          title: isCN ? "标记为收藏" : "Mark as Favorite",
          intro: isCN
            ? "点击这里将此题标记为收藏，便于稍后复习。"
            : "Click here to mark this question as a favorite, so that it can be reviewed later."
        },
        {
          element: ".question .question-type",
          title: isCN ? "问题类别" : "Question Type",
          intro: isCN
            ? "这里显示当前问题的类别，帮助你了解题目所属类别。"
            : "Here shows the current question type, help you understand the category of the question."
        },
        {
          element: ".question .question-num",
          title: isCN ? "问题序号" : "Question Number",
          intro: isCN
            ? "这里显示当前题目的序号和总题数，方便你跟踪进度。"
            : "Here shows the current question number and total number of questions, help you track your progress."
        },
        {
          element: ".question .question-text",
          title: isCN ? "问题内容" : "Question Content",
          intro: isCN
            ? "这是问题的内容，请仔细阅读后选择正确的答案。"
            : "This is the question content, carefully read and select the correct answer."
        },
        {
          element: ".question .options",
          title: isCN ? "可选答案" : "Available Options",
          intro: isCN
            ? "这里是可选答案，点击一个选项来选择你的答案。"
            : "Here are the available options, click one option to select your answer."
        },
        {
          element: ".question .answer",
          title: isCN ? "答案解析" : "Answer Explanation",
          intro: isCN
            ? "这里是答案解析，可以帮助你理解答案的含义。"
            : "Here is the answer explanation, help you understand the meaning of the answer."
        },
        {
          element: ".question .icon.check",
          title: isCN ? "自动检查" : "Auto Check",
          intro: isCN
            ? "开启这个按钮将在每次选择选项后自动显示答案解析并检查答案。"
            : "Enabling this button will automatically display the answer explanation and check the answer after each selection."
        },
        {
          element: ".question .icon.stick",
          title: isCN ? "固定解析" : "Stick Explanation",
          intro: isCN
            ? "开启这个按钮将固定显示答案解析。"
            : "Enabling this button will fix the answer explanation."
        },
        {
          element: ".question .question-footer",
          title: isCN ? "题目操作" : "Question Footer",
          intro: isCN
            ? "使用这些按钮来查看题库、查看答案或者更换题目。"
            : "Use these buttons to view questions, view the answer, or change questions."
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
      setIntroFinished("isQuestionIntro", true);
    })
    .start();
}

export function setOverviewIntro(isCN = true, setIntroFinished) {
  introJs()
    .setOptions({
      steps: [
        {
          title: isCN ? "欢迎来到 Little Cookies" : 'Welcome',
          intro: isCN
            ? "👋 欢迎来到 Little Cookies 的总览页面。"
            : "👋 Welcome to the overview page of Little Cookies."
        },
        {
          element: ".overview .icon-return",
          title: isCN ? "返回上一页" : "Return to Previous Page",
          intro: isCN
            ? "点击这里返回到上一页。"
            : "Click here to return to the previous page."
        },
        {
          element: ".overview .icon.wrong",
          title: isCN ? "显示错题" : "Show Wrong",
          intro: isCN
            ? "启用这里显示所有错题。"
            : "Enabling this button will show all wrong questions."
        },
        {
          element: ".overview .icon.fav",
          title: isCN ? "显示收藏" : "Show Favorite",
          intro: isCN
            ? "启用这里显示所有收藏的题目。"
            : "Enabling this button will show all favorite questions."
        },
        {
          element: ".overview .icon.clear",
          title: isCN ? "清除数据" : "Clear Data",
          intro: isCN
            ? "点击这里清除用户数据。"
            : "Click here to clear user data."
        },
        {
          element: ".overview .page-body",
          title: isCN ? "问题列表" : "Questions List",
          intro: isCN
            ? "这里是问题列表，可以查看所有题目的题号和题目。红色为错题，绿色为答对的题目，带一个五角星为收藏的题目。"
            : "Here is the list of questions, you can view all the questions with their number and question. Red is wrong, green is the correct answer, and with a five stars is the favorite question."
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
      setIntroFinished("isOverviewIntro", true);
    })
    .start();
}
