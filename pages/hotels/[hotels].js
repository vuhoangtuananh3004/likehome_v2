
import React from 'react'
import Hotels from '../../components/Hotels/Hotels'
import { getPropertiesByDestinationId } from '../../firebaseFunction'

export async function getServerSideProps(context) {
  const id = context.query.hotels
  let data = await getPropertiesByDestinationId(id)
  if (!data) {
    data = null;
  }
  return {
    props:{
      hotels: data
    },
    revalidate:10
  }
}

function Home({hotels}) {
  if (!hotels) return (<div>Cant found any database match your destination</div>)
  return (
    <Hotels hotels={hotels.listHotels}/>
  )
}

export default Home