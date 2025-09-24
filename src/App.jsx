import { useState, useEffect } from "react"
import logo from "./images/turtle-bag.png"


function App() {
  const [formdata, setFormdata] = useState({name : "", category : ""})
  const [cart, setCart] = useState([])

  //tailwind
  const flex = `flex flex-col items-center`
  const transition = `transition-transform transition-colors transition-shadow duration-300 ease-in-out
                      shadow-lg shadow-green-700/30 w-full`
  const container = `bg-green-200 min-h-screen`
  const main = `mt-10 w-11/12`
  const logoImg = `w-28 h-28 rounded-lg mb-6`
  const form = `gap-4 p-4 w-full`
  const input = `bg-green-100 p-2 rounded-lg text-green-700 font-semibold  
                 border-2 border-green-200 
                 focus:outline-none focus:scale-105 focus:ring-2 focus:ring-lime-500 focus:shadow-xl
                 hover:border-lime-500 focus:bg-lime-100`
  const btn = `bg-gradient-to-br from-green-400 to-lime-200 text-green-600 font-bold 
               rounded-lg px-4 py-2 
               hover:scale-105 active:scale-95 hover:shadow-xl hover:from-lime-200 hover:to-green-400 
               hover:text-lime-700`
  const itemsSection = ``
  //

  useEffect(() => {

  }, [])

  const handleChange = e => {
    const {name, value} = e.target 
    setFormdata(f => ({...f, [name] : value}))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(formdata)
  }


  return (
    <div className={`${flex} ${container}`}>
      <main className={`${flex} ${main}`}>
        <img src={logo} alt="logo" className={logoImg} />
        <form className={`${flex} ${form}`} onSubmit={handleSubmit}>
          <input 
            className={`${input} ${transition}`} 
            type="text"
            name="name"
            placeholder="Item name..."
            aria-label="Enter item name"
            value={formdata.name}
            onChange={handleChange}
            required
          />
          <select 
            className={`${input} ${transition} bg-transparent appearance-none`}
            name="category"
            value={formdata.category}
            onChange={handleChange}
            aria-label="Select a category"
            required
          >
            <option value="">Select category...</option>
            <option value="house">House</option>
            <option value="bath">Bath</option>
            <option value="grocery">Grocery</option>
            <option value="clothing">Clothing</option>
            <option value="electronic">Electronic</option>
            <option value="minsc">Minsc</option>
          </select>
          <button className={`${transition} ${btn}`} type="submit">Add to Cart</button>
        </form>
        <section className={itemsSection}>
           <p>items array here</p>
        </section>
      </main>
    </div>
  )
}

export default App
