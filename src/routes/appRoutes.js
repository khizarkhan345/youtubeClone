import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "../components/HeaderArea/Header";
import SideBar from "../components/SideBarArea/SideBar";
import Dashboard from "../components/DashboardArea/Dashboard";
import UploadVideo from "../components/uploadVideo";
import ExplorePage from "../components/ExplorePage";
import ShortsPage from "../components/ShortsPage";
import LibraryPage from "../components/LibraryPage";
import SubscriptionsPage from "../components/SubscriptionsPage";

function AppRoutes(){

    return (
    <BrowserRouter>
        <div>
         
        <SideBar />
         <Header />
         
         <Routes>
          <Route path="/" element={<Dashboard />} exact={true} />
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