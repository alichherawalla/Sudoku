import React from 'react'
import MediaQuery from 'react-responsive'
import { MAX_MOBILE_WIDTH } from '../../utils/constants'
const Mobile = props => (<MediaQuery {...props} maxDeviceWidth={MAX_MOBILE_WIDTH} />)
export default Mobile
