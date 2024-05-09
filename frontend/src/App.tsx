import './App.css'
import TileCard from "./TileCard.tsx";
import {useEffect, useRef, useState} from "react";
import ChunkCard from "./ChunkCard.tsx";

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

type Movement = {
    start: number,
    startPosition: { x: number, y: number },
    direction: { x: -1 | 0 | 1, y: -1 | 0 | 1 }
};

function App() {

    const [movement, setMovement] = useState<Movement>({
        start: Date.now(),
        startPosition: {x: 0, y: 0},
        direction: {x: 0, y: 0},
    })
    const [crop, setCrop] = useState(scoutDirections.right)
    const setFrameCount = useState(0)[1]

    const mapRef = useRef<HTMLDivElement>(null);
    const scoutRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (event: KeyboardEvent) => {
        const direction = movements[event.key as keyof typeof movements];
        if (direction) {
            setMovement(oldMovement =>{
                if (oldMovement.direction.x === direction.x && oldMovement.direction.y === direction.y) {
                    return oldMovement;
                }
                return {
                    start: Date.now(),
                    startPosition: calculatePosition(oldMovement),
                    direction,
                };
            });
            event.preventDefault()
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        const direction = movements[event.key as keyof typeof movements];
        if (direction) {
            setMovement(oldMovement => {
                return {
                    start: Date.now(),
                    startPosition: calculatePosition(oldMovement),
                    direction: {x: 0, y: 0},
                }
            });
            event.preventDefault()
        }
    };

    function calculatePosition(currentMovement: Movement) {
        const now = Date.now();
        const timePassed = now - currentMovement.start;
        const speed = 0.1;
        const distance = speed * timePassed;
        return {
            x: currentMovement.startPosition.x - distance * currentMovement.direction.x,
            y: currentMovement.startPosition.y - distance * currentMovement.direction.y,
        };
    }

    const moveScout = () => {
        const scout = scoutRef.current;
        if (!scout) {
            return;
        }
        const map = mapRef.current;
        if (!map) {
            return;
        }
        const distance = calculatePosition(movement);
        if (!distance) {
            return;
        }

        if (!movement) {
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

        map.style.left = `${distance.x}px`;
        map.style.top = `${distance.y}px`;
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
        <div className="screen">
            <div className="centerShock">
                <div className="map" ref={mapRef}>
                    <ChunkCard x={0} y={0}/>
                    <ChunkCard x={1} y={0}/>
                    <ChunkCard x={0} y={1}/>
                    <ChunkCard x={1} y={1}/>
                </div>
            </div>
            <div className="scout" ref={scoutRef}>
                <TileCard
                    tile={{x: 0, y: 0, type: "scout"}}
                    crop={crop}
                />
            </div>
        </div>
    )
}

export default App
