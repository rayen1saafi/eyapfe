import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "./Pages/Profile";

import PrivateRoute from "./routes/PriveteRoute";
import { getusers, userCurrent } from "./redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Verifyaccount from "./Pages/Verifyaccount";
import Forgotpassword from "./Pages/Forgotpassword";
import Reset_password from "./Pages/Reset_password";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Instructors from "./Pages/Instructors";
import InstructorsDetails from "./Pages/InstructorsDetails";
import Packs from "./Pages/Packs";
import { getPack } from "./redux/packSlice/packSlice";
import Courses from "./Pages/Courses";
import { getCours } from "./redux/coursSlice/coursSlice";
import Learner from "./Components/Learner";
import SideBar from "./Components/SideBar";
import PacksDashbord from "./Pages/PacksDashbord";
import CoursDashbord from "./Pages/CoursDashbord";
import InstructorDashbord from "./Components/InstructorDashbord";
import CoursesDetails from "./Pages/CoursesDetails";
import Test from "./Pages/Test";
import { getFile } from "./redux/fileSlice/fileSlice";
import { getLesson } from "./redux/lessonSlice/lessonSlice";
import FileDetails from "./Pages/FileDetails";
import { getRating } from "./redux/ratingSlice/ratingSlice";
import QuizzStudent from "./Pages/QuizzStudent";
import { getQuizz } from "./redux/QuizzSlice/quizzSlice";
import QuizzInstracotor from "./Pages/QuizzInstracotor.jsx";
import { getQuestion } from "./redux/QuizzSlice/questionSlice";
import { getAnswer } from "./redux/QuizzSlice/answerSlice.js";
import { getAnswerStudent } from "./redux/QuizzSlice/answerStudentSlice";
import QuizzResult from "./Pages/QuizzResult.jsx";
import { getMeet } from "./redux/MeetSlice/meetSlice.js";
import Meet from "./Pages/Meet.jsx";
import Contact from "./Pages/Contact.jsx";
import About from "./Pages/About.jsx";
import Registerpage from "./Pages/Registerpage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import LoginPrivateRoutes from "./routes/LoginPrivateRoutes.js";
import DashboardPrivate from "./routes/DashboardPrivate.js";

// --------------------end importation------------------
function App() {
  // ---------------- back to first of page -----------
  //verify user is logged in
  const isAuth = localStorage.getItem("token");
  //declaration dipatch
  const dispatch = useDispatch();
  const [reloadPage, setReloadPage] = useState(false);

  //useEffect & dispatch to get data
  useEffect(() => {
    if (isAuth) {
      dispatch(userCurrent());
    }
    dispatch(getusers());
    dispatch(getPack());
    dispatch(getCours());
    dispatch(getFile());
    dispatch(getLesson());
    dispatch(getRating());
    dispatch(getQuizz());
    dispatch(getQuestion());
    dispatch(getAnswer());
    dispatch(getAnswerStudent());
    dispatch(getMeet());
  }, [dispatch, reloadPage]);

  const user = useSelector((state) => state?.user?.user);

  const [search, setSearch] = useState("");

  const location = useLocation();
  const [pourcentageCours, setpourcentageCours] = useState(0);

  return (
    <div>
      {location.pathname.includes("/dashbord") && user?.role == "admin" ? (
        <>
          <SideBar search={search} setSearch={setSearch} />
        </>
      ) : (
        <Navbar />
      )}

      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} /> {/* home route */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* home route */}
          {/* forgot password */}
          <Route element={<LoginPrivateRoutes />}>
            <Route path="/reset-password/:token" element={<Reset_password />} />
            {/* forgotpassword */}
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            {/* reset instructors */}
            <Route path="/Register" element={<Registerpage />} />{" "}
            <Route path="/Login" element={<LoginPage />} />{" "}
            {/* Register route */}
          </Route>
                    <Route element={<PrivateRoute />}>

          <Route
            path="/profile"
            element={
              <Profile reloadPage={reloadPage} setReloadPage={setReloadPage} />
            }
          />{" "}
          {/* Profile route */}
          <Route
            path="/packs"
            element={
              <Packs
                search={search}
                setSearch={setSearch}
                reloadPage={reloadPage}
                setReloadPage={setReloadPage}
              />
            }
          />{" "}
          {/* Packs route */}
          <Route
            path="/cours/:id"
            element={
              <Courses
                search={search}
                setSearch={setSearch}
                pourcentageCours={pourcentageCours}
                setpourcentageCours={setpourcentageCours}
              />
            }
          />{" "}
          {/* Packs route */}
          <Route path="/verify-account/:token" element={<Verifyaccount />} />
          {/*verification compte */}
          <Route path="/instructors" element={<Instructors />} />
          <Route
            path="/instructors/details/:id"
            element={
              <InstructorsDetails
                reloadPage={reloadPage}
                setReloadPage={setReloadPage}
              />
            }
          />
          <Route
            path="cours/coursesdetails/:id"
            element={
              <CoursesDetails
                reloadPage={reloadPage}
                setReloadPage={setReloadPage}
                pourcentageCours={pourcentageCours}
                setpourcentageCours={setpourcentageCours}
              />
            }
          />
          <Route
            path="/quizzStudent/:id"
            element={
              <QuizzStudent
                reloadPage={reloadPage}
                setReloadPage={setReloadPage}
              />
            }
          />
          <Route
            path="/quizzInstractor/:id"
            element={
              <QuizzInstracotor
                setReloadPage={setReloadPage}
                reloadPage={reloadPage}
              />
            }
          />
          <Route
            path="/quizzresult/:user_id/:quizz_id"
            element={
              <QuizzResult
                setReloadPage={setReloadPage}
                reloadPage={reloadPage}
              />
            }
          />
          <Route path="fileDetails/:file_id" element={<FileDetails />} />
          <Route path="/meet/:id" element={<Meet />} />
          </Route>
          {/* ------------ dashbord--------------------- */}
          <Route element={<DashboardPrivate />}>
            <Route
              path="dashbord/packs"
              element={
                <PacksDashbord
                  reloadPage={reloadPage}
                  setReloadPage={setReloadPage}
                  search={search}
                  setSearch={setSearch}
                />
              }
            />
            <Route
              path="dashbord/learner"
              element={
                <Learner
                  reloadPage={reloadPage}
                  setReloadPage={setReloadPage}
                  search={search}
                  setSearch={setSearch}
                />
              }
            />
            <Route
              path="dashbord/Instructor"
              element={
                <InstructorDashbord
                  search={search}
                  reloadPage={reloadPage}
                  setReloadPage={setReloadPage}
                />
              }
            />
            <Route
              path="dashbord/cours/:id"
              element={
                <CoursDashbord
                  reloadPage={reloadPage}
                  setReloadPage={setReloadPage}
                  search={search}
                />
              }
            />
          </Route>
          {/* ------- dashbord ----- */}
        </Routes>
      </div>

      {location.pathname.includes("/dashbord") && user?.role == "admin" ? (
        <></>
      ) : (
        <Footer />
      )}
    </div>
  );
}

export default App;
