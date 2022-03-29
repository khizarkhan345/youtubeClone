import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "../components/HeaderArea/Header";
import SideBar from "../components/SideBarArea/SideBar";
import Dashboard from "../components/DashboardArea/Dashboard";
import UploadVideo from "../components/UploadArea/uploadVideo";
import ExplorePage from "../components/ExplorePage";
import ShortsPage from "../components/ShortsPage";
import LibraryPage from "../components/LibraryPage";
import SubscriptionsPage from "../components/SubscriptionsPage";
import SignIn from "../components/Auth/SignIn/SignIn";
import SignUp from "../components/Auth/SignUp/SignUp";

function AppRoutes(){

    return (
    <BrowserRouter>
        <div>
         
        <SideBar />
         <Header />
         
         <Routes>
          <Route path="/" element={<Dashboard />} exact={true} />
          <Route path="/signin" element={<SignIn />} exact={true} />
          <Route path="/signup" element={<SignUp />} exact={true} />
          <Route path="/uploadVideo" element={<UploadVideo />} exact={true} />
          <Route path="/explore" element={<ExplorePage />} exact={true} />
          <Route path="/shorts" element={<ShortsPage />} exact={true} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} exact={true} />
          <Route path="/library" element={<LibraryPage />} exact={true} />
         </Routes>
        </div>
         
    </BrowserRouter>
    )
}

export default AppRoutes;