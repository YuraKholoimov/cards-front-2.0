import './App.css';
import {useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {AppRootStateType, useAppDispatch} from '../b2-bll/store';
import {initializeAppThunk} from '../b2-bll/appReducer';
import Preloader from './common/preloader/Preloader';
import { Header } from './header/Header';
import { RoutesComponent } from './routes/RoutesComponent';

function App() {

    const dispatch = useAppDispatch();

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitializedApp)

    useEffect(() => {
        dispatch(initializeAppThunk())
    }, [])

    if (!isInitialized) {
        return <Preloader/>
    }
    return (
        <div className="App">
            <Header/>
            <RoutesComponent/>
        </div>
    );
}

export default App;
