import React from 'react'
import PropTypes from 'prop-types'


const Error = ({message}) => {
return(
  <div className='red darken-4 error'>{message}</div>
)


}

Error.propTypes = {
  message: PropTypes.string.isRequired
}

export default Error