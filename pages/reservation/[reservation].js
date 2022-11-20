import React from 'react'
import Reservation from '../../components/Reservation/Reservation'

export async function getServerSideProps(context) {
    const queryParam = context.query
   
    return {
      props:{queryParam :queryParam}
    }
  }

function Home({queryParam}) {
  return (
    <div><Reservation queryValue={queryParam}/></div>
  )
}

export default Home