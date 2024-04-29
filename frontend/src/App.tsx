import './App.css'
import TileCard from "./TileCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {Tile} from "./Tile.ts";

function App() {

    const [tiles, setTiles] = useState<Tile[]>([])

    useEffect(() => {
        axios.get('/api/tiles')
            .then((response) => {
                setTiles(response.data)
            });
    }, [])

    return (
        tiles.map((tile) => {
            return <TileCard tile={tile}/>
        })
    )
}

export default App
