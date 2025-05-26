import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LanguagesPage from "./pages/LanguagesPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SingleLanguagePage from "./pages/SingleLanguagePage";
import VideosPage from "./pages/VideosPage";
import QuizPage from "./pages/QuizPage";
import NotFoundPage from "./pages/NotFoundPage";
import TopicQuiz from "./pages/TopicQuiz";
import Doubt from "./components/Doubt";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/signup">
              <SignupPage />
            </Route>
            <PrivateRoute exact path="/languages-page" component={LanguagesPage} />
            <Route exact path="/doubt">
              <Doubt />
            </Route>
            <PrivateRoute exact path="/profile" component={ProfilePage} />

            <PrivateRoute exact path="/languages-page/:languageName" component={SingleLanguagePage} />
            <PrivateRoute exact path="/languages-page/:languageName/videos" component={VideosPage} />
            <PrivateRoute exact path="/languages-page/:languageName/quiz" component={QuizPage} />
            <PrivateRoute exact path="/languages-page/:languageName/quiz/:topicName" component={TopicQuiz} />

            <Route exact path="*">
              <NotFoundPage />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
