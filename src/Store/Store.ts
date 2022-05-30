import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
// import {AppReducer} from '../App/AppReducer';
import {ActionsType, passwordRestoreReducer} from '../Components/Pages/Password_Restore/PasswordRestore-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const rootReducer = combineReducers({
    // app: AppReducer,
    restore: passwordRestoreReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type TypedDispatch = ThunkDispatch<AppRootStateType, any, ActionsType>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
