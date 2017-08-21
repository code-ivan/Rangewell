// @flow
import React from 'react'
import Helmet from 'react-helmet'
import { string, shape, object, arrayOf } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchIntroducers, getIntroducers } from './redux'

export const Landing = (props: Object) => {
    const { introducers } = props
    
    return ( <main>
        {/* Use Helmet for all meta tag */}
        <Helmet title="Landing Page">
        <meta name="description" content="" />
        </Helmet>
        <h1>Landing Page</h1>
        <ul>
        { introducers.map(({ introducerid, clientname, alias }) => (
          <li key={ introducerid }>
          <Link to={ `/landing/${ alias }` }>{ clientname }</Link>
          </li>
        )) }
      </ul>
    </main>
    )
}

Landing.displayName = 'Landing'

Landing.propTypes = {
    introducers: arrayOf(
      shape({
        introducerid: string.isRequired,
        clientname: string.isRequired,
        alias: string.isRequired
      })
    ).isRequired
  }
  
Landing.fetchData = ({ dispatch }) => dispatch(fetchIntroducers())
 
const mapStateToProps = state => ({
  introducers: getIntroducers(state)
})

export default connect(mapStateToProps)(Landing)
