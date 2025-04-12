import React from 'react'
import Button from './Button'
import InputFeild from '../components/InputFeild'

const Salary = ({handleChange,handleClick}) => {
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Salary</h4>
        <div className='mb-4'>
            <Button onClickHandler={handleChange} value={""} title="Hourly"/>
            <Button onClickHandler={handleChange} value={"monthly"} title="Monthly"/>
            <Button onClickHandler={handleChange} value={"yearly"} title="Yearly"/>
        </div>
        <div>
        <label className='sidebar-label-container'>
                <input type="radio" name='test' value="" onChange={handleChange} />
                <span className='checkmark'></span>All
            </label>

            <InputFeild handleChange={handleChange} value={30} title="< 30000k" name="test2"/>
            <InputFeild handleChange={handleChange} value={50} title="< 50000k" name="test2"/>
            <InputFeild handleChange={handleChange} value={80} title="< 80000k" name="test2"/>
            <InputFeild handleChange={handleChange} value={100} title="< 100000k" name="test2"/>
            
        </div>
    </div>
  )
}

export default Salary