import './App.css'
import TileCard from "./TileCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {Tile} from "./Tile.ts";

function App() {

    const [tiles, setTiles] = useState<Tile[]>([])
    const [scoutX, setScoutX] = useState(0)
    const [scoutY, setScoutY] = useState(0)

    useEffect(() => {
        axios.get('/api/tiles')
            .then((response) => {
                setTiles(response.data)
            });
    }, [])

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            setScoutX(x => x + 16)
            event.preventDefault()
        }
        if (event.key === "ArrowLeft") {
            setScoutX(x => x - 16)
            event.preventDefault()
        }
        if (event.key === "ArrowUp") {
            setScoutY(y => y - 16)
            event.preventDefault()
        }
        if (event.key === "ArrowDown") {
            setScoutY(y => y + 16)
            event.preventDefault()
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            {
                tiles.map((tile) => {
                    return <TileCard tile={tile}/>
                })
            }
            <TileCard tile={{x: scoutX, y: scoutY, type: "scout"}}/>
        </>
    )
}

export default App
