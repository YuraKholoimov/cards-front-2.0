import './App.css';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../b2-bll/store';
import {initializeAppThunk} from '../b2-bll/appReducer';
import Preloader from './common/preloader/Preloader';
import {RoutesComponent} from './routes/RoutesComponent';

function App() {

    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitializedApp)

    useEffect(() => {
        dispatch(initializeAppThunk())
    }, [])

    if (!isInitialized) {
        return <Preloader/>
    }
    return (
        <div className="App">
            <RoutesComponent/>
        </div>
    );
}

export default App;
