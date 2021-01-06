import {combineReducers} from 'redux';
import {handleMapTools} from '../components/mapBox/tools/reducer'
import {schoolHandle} from '../screens/School/redux/reducers';

export default combineReducers({
    handleMapTools,
    schoolHandle
})

