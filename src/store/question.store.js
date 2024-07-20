import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {QUESTIONS_EN} from "../data/questions_data";
import {QUESTIONS_CN} from "../data/questions_data_CN";

export const useQuestions = create(
  persist((set) => ({
    allQuestions: [], allQuestions_CN: [],

    reset: () => set(() => ({
      allQuestions: QUESTIONS_EN, allQuestions_CN: QUESTIONS_CN
    }))
  }), {
    name: 'ddt-questions'
  })
);

export const useFilterQuestions = create(
  persist((set) => ({
    filterByError: false,
    filterByFavorite: false,
    filterQuestionIds: [],

    updateQuestionIds: (ids) => set(() => ({filterQuestionIds: ids})),
    updateTypeByError: (bool) => set(() => ({filterByError: bool})),
    updateTypeByFavorite: (bool) => set(() => ({filterByFavorite: bool})),
  }), {
    name: 'ddt-filterQuestions'
  })
)

export const useCurrQuestionIdx = create(
  persist((set) => ({
    currQuestionIdx: 0,

    update: (index) => set(() => ({currQuestionIdx: index}))
  }), {
    name: 'ddt-currQuestionIdx'
  })
)

export const useQuestionConfig = create(
  persist((set) => ({
    isExplain: false,
    isCheck: false,
    isStick: false,

    update: (config) => set((state) => ({
      ...state,
      ...config
    })),
  }), {
    name: 'ddt-questionConfig'
  })
)

export const useAnswers = create(
  persist((set) => ({
    userAnswers: [],

    reset: (answers = []) => set(() => ({userAnswers: answers})),

    add: (answer) => set((state) => ({userAnswers: [...state.userAnswers, answer]})),

    update: (updatedAnswer) => set((state) => {
      const found = state.userAnswers.some(answer => answer.questionId === updatedAnswer.questionId);

      if (found) {
        return {
          userAnswers: state.userAnswers.map(answer =>
            answer.questionId === updatedAnswer.questionId ? {...answer, ...updatedAnswer} : answer
          )
        };
      } else {
        return {
          userAnswers: [...state.userAnswers, updatedAnswer]
        };
      }
    }),

    purge: (a) => set((state) => ({
      useAnswers: state.userAnswers.filter(answer => answer.questionId !== a.questionId)
    }))
  }), {
    name: 'dtt-answers'
  })
)