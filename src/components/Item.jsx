export default function Item({data, ...rest}){
    const {name, category} = data

    //tailwind
      const btn = `p-2 font-bold text-lg rounded-lg shadow-lg bg-gradient-to-br 
                   transition-transform transition-colors transition-shadow duration-300 ease-in-out 
                   hover:scale-105 active:scale-95 hover:shadow-xl `
      const variants = {
        default : `from-gray-500 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-500`,
        house : `from-rose-400 to-rose-200 text-rose-700 hover:from-rose-200 hover:to-rose-400`,
        bath : `from-blue-400 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-400`,
        grocery : `from-yellow-400 to-yellow-200 text-yellow-700 hover:from-yellow-200 hover:to-yellow-400`,
        clothing : `from-lime-400 to-lime-200 text-lime-700 hover:from-lime-200 hover:to-lime-400`,
        electronic : `from-purple-400 to-purple-200 text-purple-700 hover:from-purple-200 hover:to-purple-400`,
        minsc : `from-orange-400 to-orange-200 text-orange-700 hover:from-orange-200 hover:to-orange-400`
      }
    //
    return(
        <button className={`${btn} ${variants[category.toLowerCase() || "default"]}`} {...rest}>
            {name}
        </button>
    )

}