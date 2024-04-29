import './App.css'
import Tile from "./Tile.tsx";

function App() {

    return (
        <>
            {
                Array.from({ length: 10 }, (_, i) => i).map((row) => {
                    return Array.from({ length: 10 }, (_, i) => i).map((col) => {
                        return <Tile row={row} col={col}/>
                    })
                })
            }
        </>
    )
}

export default App
