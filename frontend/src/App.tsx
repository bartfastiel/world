import './App.css'

function App() {

    return (
        <>
            {
                Array.from({ length: 10 }, (_, i) => i).map((row) => {
                    return Array.from({ length: 10 }, (_, i) => i).map((col) => {
                        return <img src="ME_Singles_City_Props_16x16_Shrub_2.png" className="tile" style={{
                            top: `${row * 16}px`,
                            left: `${col * 16}px`,
                        }}></img>
                    })
                })
            }
        </>
    )
}

export default App
