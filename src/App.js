import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  Navigate,
  
} from "react-router-dom";

import PermanentDrawerLeft from "./pages/Drawer";
import ListNews from "./pages/News/ListNews";
import ListEvents from "./pages/Events/ListEvents";
import AddNews from "./pages/News/AddNews";
import "./App.css";
import AddEvents from "./pages/Events/AddEvents";
import store from './redux/store'
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <PermanentDrawerLeft page="API integration" />
        <Routes>
          <Route path="/news" element={<ListNews />} />
          <Route path="/add_news" element={<AddNews />} />
          <Route path="/events" element={<ListEvents />} />
          <Route path="/add_events" element={<AddEvents />} />
          <Route path="*" element={<Navigate to={"/news"} replace/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
