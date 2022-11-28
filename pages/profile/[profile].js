import React from 'react'
import MainProfile from '../../components/Profile/MainProfile'

export async function getServerSideProps(context) {
  console.log(context);
  return {
    props: {}, // will be passed to the page component as props
  }
}
function Home() {
  return (
    <div><MainProfile/></div>
  )
}

export default Home