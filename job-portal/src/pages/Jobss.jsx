import React from 'react'

const Jobss = ({result}) => {
  return (
    <>
    <div>
    <h3 className='text-lg font-bold mb-2'>{result.length} Jobss</h3>
    </div>
    <section>{result}</section>
    </>
  )
}

export default Jobss