import './App.css'
import TileCard from "./TileCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {Tile} from "./Tile.ts";

const movements = {
    "ArrowRight": {x: 1, y: 0},
    "ArrowLeft": {x: -1, y: 0},
    "ArrowUp": {x: 0, y: -1},
    "ArrowDown": {x: 0, y: 1},
} as const;

function App() {

    const [tiles, setTiles] = useState<Tile[]>([])
    const [scoutX, setScoutX] = useState(0)
    const [scoutY, setScoutY] = useState(0)
    const [movement, setMovement] = useState<{start: number, direction: { x: -1 | 0 | 1, y: -1 | 0 | 1 }}>()

    useEffect(() => {
        axios.get('/api/tiles')
            .then((response) => {
                setTiles(response.data)
            });
    }, [])

    const handleKeyDown = (event: KeyboardEvent) => {
        const direction = movements[event.key as keyof typeof movements];
        if (direction) {
            setMovement({
                start: Date.now(),
                direction,
            })
            event.preventDefault()
        }
    };

    // whenever a frame is requested (requestAnimationFrame), calculate the position of the scout
    useEffect(() => {
        if (!movement) {
            return;
        }

        const now = Date.now();
        const timePassed = now - movement.start;
        const speed = 0.1;
        const distance = speed * timePassed;

        setScoutX((prev) => prev + movement.direction.x * distance);
        setScoutY((prev) => prev + movement.direction.y * distance);

        requestAnimationFrame(() => {
            setMovement({
                start: now,
                direction: movement.direction,
            });
        });
    }, [movement]);

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
