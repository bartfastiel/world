import {Tile} from "./Tile.ts";
import {TileType} from "./TileType.ts";

const tileTypes: {[key in TileType]: {src: string, width: number, height: number}} = {
    "gras": {
        src: "ME_Singles_City_Props_16x16_Shrub_2.png",
        width: 16,
        height: 16,
    },
    "tree": {
        src: "ME_Singles_Camping_16x16_Tree_8.png",
        width: 64,
        height: 64,
    },
    "tent": {
        src: "ME_Singles_Camping_16x16_Tent_1.png",
        width: 64,
        height: 64,
    },
    "scout": {
        src: "Scout.png",
        width: 927,
        height: 656,
    },
}

type TileProps = {
    tile: Tile
    crop?: {
        fromX: number
        fromY: number
        toX: number
        toY: number
    }
}

export default function TileCard({tile, crop}: TileProps) {

    const tileType = tileTypes[tile.type]

    if (crop) {
        return (
            <div className="tile" style={{
                top: `${tile.y}px`,
                left: `${tile.x}px`,
                width: `${tileType.width}px`,
                height: `${tileType.height}px`,
                backgroundImage: `url(${tileType.src})`,
                backgroundPosition: `-${crop.fromX}px -${crop.fromY}px`,
            }}></div>
        )

    }

    return (
        <img src={tileType.src} className="tile" style={{
            top: `${tile.y}px`,
            left: `${tile.x}px`,
            width: `${tileType.width}px`,
            height: `${tileType.height}px`,
        }}></img>
    )
}