import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Header from '../../header/header'
import Arduinos from './arduinos/arduinos'
import Learn from './learn/learn'

import './style.css'

export default class Dashboard extends React.Component {
  render () {
    return (
      <div className='dashboard'>
        <Header />
        <div className='content container'>
          <TransitionGroup>
            <CSSTransition
              key={this.props.location.pathname}
              classNames='router-animation'
              timeout={{ enter: 150, exit: 0 }}>
              <Switch location={this.props.location}>
                <Redirect exact from={this.props.match.url} to={`${this.props.match.url}/arduinos`} />
                <Route path={`${this.props.match.url}/arduinos`} component={Arduinos} />
                <Route path={`${this.props.match.url}/learn`} component={Learn} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object
}
