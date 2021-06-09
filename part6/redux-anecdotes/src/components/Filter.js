import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import {startFilter} from '../reducers/filterReducer'
import {connect} from 'react-redux' 

const Filter = (props) => {
  //const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    //dispatch(startFilter(event.target.value))
    props.startFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  startFilter
}

export default connect(
  null,
  mapDispatchToProps
  )(Filter)