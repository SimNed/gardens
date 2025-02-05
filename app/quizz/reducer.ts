import { QuestionType } from "@/types/quizz";

export interface QuizzState {
  index: number;
  questionnaire: Array<QuestionType>;
}

type QuizzActions =
  | { type: "next_question" }
  | { type: "handle_correct_field"; index: number };

export default function quizzReducer(state: QuizzState, action: QuizzActions) {
  switch (action.type) {
    case "next_question": {
      return {
        ...state,
        index: state.index + 1,
      };
    }

    case "handle_correct_field": {
      const currentQuestion = state.questionnaire[state.index];

      const updatedQuestion = {
        ...currentQuestion,
        fields: currentQuestion.fields.map((field, index) =>
          index === action.index ? { ...field, success: true } : field
        ),
      };

      return {
        ...state,
        questionnaire: state.questionnaire.map((question, idx) =>
          idx === state.index ? updatedQuestion : question
        ),
      };
    }

    default: {
      throw Error("Unknown action");
    }
  }
}
