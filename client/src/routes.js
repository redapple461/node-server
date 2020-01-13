import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { MainPage } from './pages/mainPage'
import HeroList from './pages/heroList'
import { NotFound } from './pages/notFound'
import { HeroDetailPage } from './pages/heroDetailPage'



export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/main" >
                <MainPage/>
            </Route>
            <Route path="/heroes">
                <HeroList/>
            </Route>
            <Route path="/notFound">
                <NotFound/>
            </Route>
            <Route path="/detailHero/:id" component={HeroDetailPage}>
            </Route>
            <Route path="/" >
                <Redirect to="/main" />
            </Route>
            <Redirect to="/notFound" />
        </Switch>
    )
}