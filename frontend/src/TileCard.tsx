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
    "scout": {
        src: "Scout.png",
        width: 16,
        height: 32,
    },
}

type TileProps = {
    tile: Tile
}

export default function TileCard({tile}: TileProps) {

    const tileType = tileTypes[tile.type]

    return (
        <img src={tileType.src} className="tile" style={{
            top: `${tile.x}px`,
            left: `${tile.y}px`,
            width: `${tileType.width}px`,
            height: `${tileType.height}px`,
        }}></img>
    )
}