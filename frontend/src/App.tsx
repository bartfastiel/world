import './App.css'
import Tile from "./Tile.tsx";

function App() {

    return (
        <>
            {
                Array.from({ length: 10 }, (_, i) => i).map((row) => {
                    return Array.from({ length: 10 }, (_, i) => i).map((col) => {
                        return <Tile x={row*16} y={col*16} type={"gras"}/>
                    })
                })
            }
            <Tile x={50} y={50} type={"tree"}/>
        </>
    )
}

export default App
