import React from 'react'
import MediaQuery from 'react-responsive'
import { MIN_DESKTOP_WIDTH } from '../../utils/constants'
const Desktop = props => (<MediaQuery {...props} minDeviceWidth={MIN_DESKTOP_WIDTH} />)
export default Desktop
