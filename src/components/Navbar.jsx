import Signup from "../features/Auth/authCheck"

const Navbar = props => {
  return (
    <div className="flex flex-row justify-around pb-16 pt-16 w-full">
      <h1 className="text-3xl">Peachey's Pallets</h1>
      <Signup/>
    </div>
  )
}
export default Navbar   