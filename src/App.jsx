import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landingpage from "./pages/LandingPage";
import MainLayout from "./layout/MainLayout";
import { Routers } from "./config/RouterConfig";
// sss
// Admin
import EventsPage from "./pages/Admin/Events/EventsPage";
import UserManagementPage from "./pages/Admin/UserManagement/UserManagementPage";
// Staff
import StaffEventsPage from "./pages/Staff/Events/EventsPage";
// Event Operator
import EventsOperatorPage from "./pages/EventOperator/Events/EventsPage";
//private router
import AdminRoute from "./routers/AdminRoute";
import EventOperator from "./routers/EventOperator";
import StaffRoute from "./routers/StaffRoute";

const adminRoutes = [
  { path: Routers.admin.events.route, element: <EventsPage /> },
  { path: Routers.admin.userManagement.route, element: <UserManagementPage /> },
];

const staffRoutes = [
  { path: Routers.staff.events.route, element: <StaffEventsPage /> },
];

const eventOperatorRoutes = [
  { path: Routers.eventOperator.events.route, element: <EventsOperatorPage /> },
];
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path={Routers.landing.route} element={<Landingpage />} />

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            {adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<MainLayout>{route.element}</MainLayout>}
              />
            ))}
          </Route>
          {/* Admin Routes */}
          <Route element={<StaffRoute />}>
            {staffRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<MainLayout>{route.element}</MainLayout>}
              />
            ))}
          </Route>
          {/* Event Operator Routes */}
          <Route element={<EventOperator />}>
            {eventOperatorRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<MainLayout>{route.element}</MainLayout>}
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
