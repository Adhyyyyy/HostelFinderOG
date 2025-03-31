import { BrowserRouter, Routes, Route } from "react-router-dom";
import New from "./pages/new/New";
import { userInputs, roomInputs } from "./formSource";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ... other routes ... */}
        
        {/* Users routes */}
        <Route path="/users/new" element={
          <New inputs={userInputs} title="Add New User" />
        } />

        {/* Rooms routes */}
        <Route path="/rooms/new" element={
          <New inputs={roomInputs} title="Add New Room" />
        } />
        
        {/* ... other routes ... */}
      </Routes>
    </BrowserRouter>
  );
}

export default App; 