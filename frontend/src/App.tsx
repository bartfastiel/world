import './App.css'
import TileCard from "./TileCard.tsx";
import {useEffect, useRef, useState} from "react";
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
    const [movement, setMovement] = useState<{
        start: number,
        startPosition: DOMRect,
        direction: { x: -1 | 0 | 1, y: -1 | 0 | 1 }
    }>()

    const scoutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        axios.get('/api/tiles')
            .then((response) => {
                setTiles(response.data)
            });
    }, [])

    const handleKeyDown = (event: KeyboardEvent) => {
        const scout = scoutRef.current;
        if (!scout) {
            return;
        }

        const direction = movements[event.key as keyof typeof movements];
        if (direction) {
            setMovement({
                start: Date.now(),
                startPosition: scout.getBoundingClientRect(),
                direction,
            })
            event.preventDefault()
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        const direction = movements[event.key as keyof typeof movements];
        if (direction) {
            setMovement(undefined);
            event.preventDefault()
        }
    };

    function calculatePosition() {
        if (!movement) {
            return;
        }
        const now = Date.now();
        const timePassed = now - movement.start;
        const speed = 0.1;
        const distance = speed * timePassed;
        return {
            x: movement.startPosition.x + distance * movement.direction.x,
            y: movement.startPosition.y + distance * movement.direction.y,
        };
    }

    const moveScout = () => {
        const scout = scoutRef.current;
        if (!scout) {
            return;
        }
        const distance = calculatePosition();
        if (!distance) {
            return;
        }

        scout.style.left = `${distance.x}px`;
        scout.style.top = `${distance.y}px`;

        requestAnimationFrame(() => moveScout());
    };

    useEffect(() => {
        if (!movement) {
            return;
        }

        requestAnimationFrame(() => moveScout());
    }, [movement]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <>
            {
                tiles.map((tile) => {
                    return <TileCard tile={tile}/>
                })
            }
            <div className="scout" ref={scoutRef} style={{
                position: "absolute",
            }}>
                <TileCard tile={{x: 0, y: 0, type: "scout"}}/>
            </div>
        </>
    )
}

export default App
