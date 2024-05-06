import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import packSlice from "./packSlice/packSlice";
import coursSlice from "./coursSlice/coursSlice";
import fileSlice from "./fileSlice/fileSlice";
import lessonSlice from "./lessonSlice/lessonSlice";
import ratingSlice from "./ratingSlice/ratingSlice";
import quizzSlice from "./QuizzSlice/quizzSlice";

import answerSlice from "./QuizzSlice/answerSlice";
import questionSlice from "./QuizzSlice/questionSlice";
import answerStudentSlice from "./QuizzSlice/answerStudentSlice";
import meetSlice from "./MeetSlice/meetSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    pack: packSlice,
    cours: coursSlice,
    lesson: lessonSlice,
    file: fileSlice,
    rating: ratingSlice,
    quizz: quizzSlice,
    question: questionSlice,
    answer: answerSlice,
    answerstudent: answerStudentSlice,
    meet: meetSlice,
  },
});
