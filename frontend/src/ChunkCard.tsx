import TileCard from "./TileCard.tsx";
import {useEffect, useState} from "react";
import {Tile} from "./Tile.ts";
import axios from "axios";

type Props = {
    x: number
    y: number
}

export default function ChunkCard({x, y}: Props) {

    const [tiles, setTiles] = useState<Tile[]>([])

    useEffect(() => {
        axios.get('/api/tiles/' + x + '/' + y)
            .then((response) => {
                setTiles(response.data)
            });
    }, [])

    return (
        <div className = {"chunk"}>
        {
            tiles.map((tile, i) => {
                return <TileCard key = {i}
                tile = {tile}
                />
            })
        }
        </div>
)
}
