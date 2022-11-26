
import React from 'react'
import Hotels from '../../components/Hotels/Hotels'
import { getPropertiesByDestinationId } from '../../firebaseFunction'

// export async function getServerSideProps(context) {
//   const id = context.query.hotels
//   let data = await getPropertiesByDestinationId(id)
//   if (!data) {
//     data = null;
//   }
//   return {
//     props:{
//       hotels: data
//     },
//     revalidate:10
//   }
// }

function Home() {
  return (
    <Hotels />
  )
}

export default Home