import React, {Fragment} from 'react'
import {
    BrowserRouter as Router,
    Route, Routes
} from 'react-router-dom'
import {ArticlesList, ArticleDetail} from '../pages'

import {NavBar} from '../components'

import 'bootstrap/dist/css/bootstrap.min.css'
import TrainerList from "../pages/Trainer/TrainerList/TrainerList";
import Home from "../pages/Home/Home";
import TrainerDetail from "../pages/Trainer/TrainerDetail/TrainerDetail";
import TrainingTypeList from "../pages/TrainingType/TrainingTypeList/TrainingTypeList";
import Login from "../pages/Login/Login";
import ArticlesTable from "../pages/Article/ArticleTable/ArticleTable";
import PrivateRoute from "./PrivateRoute";
import ArticleEditing from "../pages/Article/ArticleEditing/ArticleEditing";
import ArticleCreating from "../pages/Article/ArticleCreating/ArticleCreating";

function App() {
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {/*<Route path={"/:token"} element={<Home/>}/>*/}
                <Route path="/articles" element={<ArticlesList/>}/>
                <Route path="/articles/:id" element={<ArticleDetail/>}/>
                <Route path="/trainers" element={<TrainerList/>}/>
                <Route path="/trainers/:id" element={<TrainerDetail/>}/>
                <Route path="/training-types" element={<TrainingTypeList/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route exact path="/articles/manage" element={<PrivateRoute/>}>
                    <Route exact path="/articles/manage" element={<ArticlesTable/>}/>
                </Route>
                <Route exact path="/articles/manage/:id" element={<PrivateRoute/>}>
                    <Route path="/articles/manage/:id" element={<ArticleEditing/>}/>
                </Route>
                <Route exact path="/articles/manage/creating" element={<PrivateRoute/>}>
                    <Route path="/articles/manage/creating" element={<ArticleCreating/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App