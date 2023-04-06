import React, { Suspense } from 'react'
import axios from 'axios'
import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import store from '../store'
import Routes from './routes'
import ScrollToTop from '../components/common/scroll'
import Loader from '../components/common/loader'
import { setupAxios } from '../utils'

setupAxios(axios, store);

const AppContainer = () => (
    <Provider store={store}>
        <Suspense fallback={<Loader isSuspense />}>
            <Loader>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <ScrollToTop>
                        <Routes />
                    </ScrollToTop>
                </BrowserRouter>
            </Loader>
        </Suspense>
    </Provider>
)

export default AppContainer;    