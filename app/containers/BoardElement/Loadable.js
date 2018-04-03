/**
 *
 * Asynchronously loads the component for BoardElement
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null
})
