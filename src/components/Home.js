import Notes from "./Notes"

const Home = (props) => {
  return (
    <div>
      <div className='container my-4'>
        <Notes showAlert={props.showAlert} />
      </div>
    </div>
  )
}

export default Home
