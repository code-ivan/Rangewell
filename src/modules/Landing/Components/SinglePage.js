// @flow
import React from 'react'
import { string, shape, bool } from 'prop-types'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { NavLink } from 'react-router-dom'

import { fetchIntroducer, getIntroducer, getLoading } from '../redux'

export const SinglePage = (props: Object) => {
  const { landing, loading } = props
  if (!landing && loading) {
    return (
      <article>
        <Helmet title="Loading..." />
        <h1>Loading...</h1>
      </article>
    )
  }

  return (
    <section>
      <Helmet title={ landing.clientname } />
      <div>
        <NavLink to="/landing">Go Back</NavLink>
      </div>
      <img src={landing.companylogo} />
      <h1>{ landing.clientname  }</h1>
      <p>{ landing.description }</p>
    </section>
  )
}

SinglePage.displayName = 'SinglePage'

SinglePage.propTypes = {
  landing: 
    shape({
      introducerid: string,
      clientname: string,
      alias: string
    }),
  loading: bool.isRequired
}

SinglePage.fetchData = ({ dispatch }, { params }) => dispatch(fetchIntroducer(params.slug))

const mapStateToProps = (state, { match }) => ({
  landing: getIntroducer(state, match.params.slug),
  loading: getLoading(state)
})

export default connect(mapStateToProps)(SinglePage)
