import { UserProvider } from "../../context/UserContext";
import { NotificationProvider } from "../../context/NotificationContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/NavbarIn/Navbar";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import BadgesSection from "../../components/BadgesSection/BadgesSection";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import ProgressChart from "../../components/ProgressChart/ProgressChart";
import FavoriteCategories from "../../components/FavoriteCategories/FavoriteCategories";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <UserProvider>
      <NotificationProvider>
        <div className="dashboard-container">
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <div className="page-content">
              <ProfileHeader />
              <div className="two-cols">
                <BadgesSection />
                <RecentActivity />
              </div>
              <div className="two-cols">
                <ProgressChart />
                <FavoriteCategories />
              </div>
            </div>
          </div>
        </div>
      </NotificationProvider>
    </UserProvider>
  );
}
