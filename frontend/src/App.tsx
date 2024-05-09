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

function App() {

    const [movement, setMovement] = useState<{
        start: number,
        startPosition: DOMRect,
        direction: { x: -1 | 0 | 1, y: -1 | 0 | 1 }
    }>()
    const [crop, setCrop] = useState(scoutDirections.right)
    const setFrameCount = useState(0)[1]

    const mapRef = useRef<HTMLDivElement>(null);
    const scoutRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (event: KeyboardEvent) => {
        const map = mapRef.current;
        if (!map) {
            return;
        }

        const direction = movements[event.key as keyof typeof movements];
        if (direction) {
            setMovement({
                start: Date.now(),
                startPosition: map.getBoundingClientRect(),
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
            x: movement.startPosition.x - distance * movement.direction.x,
            y: movement.startPosition.y - distance * movement.direction.y,
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
            <div className="map" ref={mapRef}>
                <ChunkCard
                    x={0}
                    y={0}
                />
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
