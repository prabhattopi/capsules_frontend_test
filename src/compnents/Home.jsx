import React, { useContext } from 'react'
import Table from './Table'
import { TableDataContext } from '../context/TableData'
import { SET_SEARCH } from '../context/action'

const Home = () => {
  const {state, getData, dispatch} = useContext(TableDataContext);

  const handleChange = (e) => {
    dispatch({type: SET_SEARCH, payload: e.target.value});
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getData();
    }
  };

  return (
    <div className='bg-white h-screen w-full flex flex-col py-10 px-4 items-center gap-4'>
      {/* title */}
      <div className=''>
        <h1>Capsules Frontend Test</h1>
      </div>

      {/* search Bar */}
      <div className='w-[80%] h-[3rem] px-4 flex items-center justify-center relative'>
        <input 
          className='w-full h-full rounded-2xl shadow-2xl px-4 py-2 text-[#387872] font-bold' 
          onChange={handleChange} 
          onKeyDown={handleKeyDown} // Added onKeyDown event handler here
          value={state.search} 
          type="text" 
          placeholder='Type your medicine name here' 
        />
        <button onClick={()=>getData()} className='absolute right-10 font-bold'>Search</button>
      </div>
      <hr />

      {/* table data */}
      <Table />
    </div>
  )
}

export default Home;
