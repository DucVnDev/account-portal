// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import UsersAdmin from "./pages/UsersAdmin";
// import ChangePassword from "./pages/ChangePassword";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/users"
//           element={
//             <ProtectedRoute role="admin">
//               <UsersAdmin />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/change-password"
//           element={
//             <ProtectedRoute>
//               <ChangePassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

function App() {
  return <div>Test ReactJS hoạt động!</div>;
}
export default App;