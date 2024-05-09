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

const scoutDirections = {
    "right": {
        fromX: 0,
        fromY: 0,
        toX: 16,
        toY: 32,
    },
    "top": {
        fromX: 16,
        fromY: 0,
        toX: 32,
        toY: 32,
    },
    "left": {
        fromX: 32,
        fromY: 0,
        toX: 48,
        toY: 32,
    },
    "bottom": {
        fromX: 48,
        fromY: 0,
        toX: 64,
        toY: 32,
    },
}

function App() {

    const [tiles, setTiles] = useState<Tile[]>([])
    const [movement, setMovement] = useState<{
        start: number,
        startPosition: DOMRect,
        direction: { x: -1 | 0 | 1, y: -1 | 0 | 1 }
    }>()
    const [crop, setCrop] = useState(scoutDirections.right)
    const setFrameCount = useState(0)[1]

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

        const direction = movement.direction;
        if (direction.x === 1) {
            setCrop(scoutDirections.right);
        } else if (direction.x === -1) {
            setCrop(scoutDirections.left);
        } else if (direction.y === 1) {
            setCrop(scoutDirections.bottom);
        } else if (direction.y === -1) {
            setCrop(scoutDirections.top);
        }

        scout.style.left = `${distance.x}px`;
        scout.style.top = `${distance.y}px`;
        setFrameCount((frameCount) => frameCount + 1);
    };

    requestAnimationFrame(() => moveScout());

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
                tiles.map((tile, i) => {
                    return <TileCard key={i} tile={tile}/>
                })
            }
            <div className="scout" ref={scoutRef} style={{
                position: "absolute",
                overflow: "hidden",
                width: "16px",
                height: "32px",
            }}>
                <TileCard
                    tile={{x: 0, y: 0, type: "scout"}}
                    crop={crop}
                />
            </div>
        </>
    )
}

export default App
