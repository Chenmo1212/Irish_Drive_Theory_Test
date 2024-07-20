import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useExam = create(persist((set) => ({
  questionIds: [],
  answers: [],
  isCompleted: false,
  score: 0,
  currIdx: 0,
  createdTime: null,

  reset: () => set(() => ({
    questionIds: [],
    answers: [],
    isCompleted: false,
    isExplain: false,
    score: 0,
    currIdx: 0,
    createdTime: null
  })),

  setCreatedTime: (time) => set(() => ({createdTime: time})),

  setExamQuestionIds: (questionIds) => set(() => ({questionIds})),

  setExamAnswers: (answers) => set(() => ({answers})),

  setExamIsExplain: (bool) => set(() => ({setIsExplain: bool})),

  setExamStatus: (bool) => set(() => ({isCompleted: bool})),

  setExamScore: (score) => set(() => ({score})),

  setExamCurrIdx: (idx) => set(() => ({currIdx: idx})),
}), {
  name: 'ddt-exam'
}));

const ExamSeconds = 60 * 40;
export const useExamCountdown = create(persist((set) => ({
  countdownActive: false,
  secondsLeft: ExamSeconds,

  reset: () => set(() => ({
    countdownActive: false,
    secondsLeft: 0
  })),

  updateCountdownStatus: (bool) => set(() => ({countdownActive: bool})),

  updateSecondsLeft: (seconds) => set(() => ({secondsLeft: seconds})),
}), {
  name: 'ddt-exam-countdown'
}))

export const useExamHistory = create(persist((set) => ({
  examHistory: [],

  add: (exam) => set((state) => ({examHistory: [...state.examHistory, exam]})),
}), {
  name: 'ddt-exam-history'
}));