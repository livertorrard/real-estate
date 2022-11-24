import React, { useState }  from 'react'
import Collapse from '@mui/material/Collapse';
import './index.scss'

import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Searchbar from './Searchbar';

const Search = () => {
    const [searchAdvanced, setSearchAdvanced] = useState(false);

    const handleClick = () => {
        setSearchAdvanced(!searchAdvanced);
    };

    

    return (
    <div className="search_form_pro">
        <div className="search_group_wrap">
                <Searchbar/>
        </div>
    </div> 
  )
}

export default Search