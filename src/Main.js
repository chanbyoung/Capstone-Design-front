import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import RegisterProject from "./components/RegisterProject";
import ProjectDetail from "./components/ProjectDetail";
import UpdateProject from "./pages/UpdateProject";
import StudyListPage from "./pages/study/StudyListPage";
import RegisterStudy from "./components/study/RegisterStudy";
import UpdateStudy from "./pages/study/UpdateStudy";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FreeBoard from "./pages/FreeBoard";
import Applycation from "./pages/Applycation";
import StudyDetail from "./components/study/StudyDetail";
import BoardRegister from "./pages/BoardRegister";
import BoardDetail from "./components/BoardDetail";
import BoardUpdate from "./pages/BoardUpdate";
import ManualPage from "./pages/ManualPage";
import ConversationApp from "./pages/message//ConversationApp"; // Import your ConversationApp component
import ConversationsList from "./pages/message/ConversationList";
import AppliesList from "./pages/apply/AppliesList";
import ApplyDetails from "./pages/apply/ApplyDetails";
import MyAppliesList from "./pages/apply/MyAppliesList";
import MyApplyDetails from "./pages/apply/MyAppliesDetails";
import EditApply from "./pages/apply/EditApply";
import FindPage from "./pages/FindPage";

function Main() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Manual" element={<ManualPage />} />
          <Route path="/ProjectList" element={<ProjectListPage />} />
          <Route path="/RegisterProject" element={<RegisterProject />} />
          <Route path="/UpdateProject/:idx" element={<UpdateProject />} />
          <Route path="/ProjectInformation/:idx" element={<ProjectDetail />} />
          <Route path="/StudyList" element={<StudyListPage />} />
          <Route path="/RegisterStudy" element={<RegisterStudy />} />
          <Route path="/UpdateStudy/:idx" element={<UpdateStudy />} />
          <Route path="/StudyInformation/:idx" element={<StudyDetail />} />
          <Route path="/Applycation/:idx" element={<Applycation />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/FindPage" element={<FindPage/>}/>
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/FreeBoard" element={<FreeBoard />} />
          <Route path="/BoardUpdate/:idx" element={<BoardUpdate />} />
          <Route path="/BoardRegister" element={<BoardRegister />} />
          <Route path="/BoardInformation/:idx" element={<BoardDetail />} />
          <Route path="/conversation" element={<ConversationsList />} />{" "}
          {/* New Route */}
          <Route
            path="/conversation/:conversationId"
            element={<ConversationApp />}
          />{" "}
          {/* New Route */}
          <Route path="/appliesList" element={<AppliesList />} />
          <Route path="/appliesList/my" element={<MyAppliesList />} />
          <Route path="/appliesList/my/:applyId" element={<MyApplyDetails />} />
          <Route path="/appliesList/my/edit/:applyId" element={<EditApply />} />
          <Route path="/appliesList/:applyId" element={<ApplyDetails />} />
        
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Main;
