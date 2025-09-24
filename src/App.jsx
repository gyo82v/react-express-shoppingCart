import { useState, useEffect } from "react"
import logo from "./images/turtle-bag.png"
import Item from "./components/Item"


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
  const itemsSection = `flex flex-wrap w-full gap-3 justify-center mt-10`
  //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/cart")
        if(!res.ok) throw new Error("error while fetching data GET")
        const data = await res.json()
        setCart(data)   
      } catch (err) {
        console.error("error Get", err)
      }
    }
    fetchData()
  }, [cart])

  const cartArr = cart.map(i => (
    <Item data={i} key={i.id} onClick={() => handleDelete(i.id)} />
  ))

  const handleChange = e => {
    const {name, value} = e.target 
    setFormdata(f => ({...f, [name] : value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    
    if(!formdata.name.trim()){console.error("name is required"); return}
    if(!formdata.category.trim()){console.error("category is required"); return}

    const payload = {
      name : formdata.name,
      category : formdata.category
    }

    try {
      const res = await fetch("http://localhost:8000/api/cart", {
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify(payload)
      })
      if(!res.ok) throw new Error("Post error")
      setFormdata({name : "", category : ""})
    } catch (err) {
      console.error("POST error", err)
    }
  }
  async function handleDelete(id)  {
    try {
      const res = await fetch(`http://localhost:8000/api/cart/${id}`, {
        method : "DELETE"
      })
      if(!res.ok) throw new Error("DELETE error")
      const data = await res.json()
      
    } catch (err) {
      console.log("DELETE error", err)
    }

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
           {cartArr}
        </section>
      </main>
    </div>
  )
}

export default App
