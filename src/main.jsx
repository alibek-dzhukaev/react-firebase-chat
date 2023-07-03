import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter, Navigate,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import ChatWallPage from "./pages/ChatWall.jsx";
import ChatDialoguePage from "./pages/ChatDialogue.jsx";
import GroupDialoguePage from "./pages/GroupDialogue.jsx";
import GroupWallPage from "./pages/GroupWall.jsx";

const router = createBrowserRouter([
    {
        path: '/chat-wall',
        Component: ChatWallPage
    },
    {
        path: '/chat-dialogue/:id',
        Component: ChatDialoguePage
    },
    {
        path: '/group-wall',
        Component: GroupWallPage
    },
    {
        path: '/group-dialogue/:id',
        Component: GroupDialoguePage
    },
    {
        path: '*',
        element: <Navigate to='/chat-wall' replace/>

    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
