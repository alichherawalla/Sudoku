/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import Board from 'containers/Board/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import CenteredSection from './CenteredSection'
const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`

export default function App () {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate='%s - Sudoko'
        defaultTitle='Sudoko'>
        <meta name='description' content='Sudoko' />
      </Helmet>
      <CenteredSection>
        <Switch>
          <Route exact path='/' component={Board} />
          <Route path='' component={NotFoundPage} />
        </Switch>
      </CenteredSection>
    </AppWrapper>
  )
}
