// @flow
import React from 'react'
import Helmet from 'react-helmet'

const Home = () => (
  <main>
    {/* Use Helmet for all meta tag */}
    <Helmet title="Home">
      <meta name="description" content="Home description" />
    </Helmet>
    <h1>Home</h1>
  </main>
)

Home.displayName = 'Home'

export default Home
