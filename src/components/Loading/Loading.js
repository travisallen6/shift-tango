import React from 'react';
import './Loading.css'
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
    return (
        <div className='loading-container'>
            <CircularProgress size={100} />
        </div>
     );
}
 
export default Loading;