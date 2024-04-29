
const tileTypes = {
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
}

type TileProps = {
    y: number
    x: number
    type: keyof typeof tileTypes
}

export default function Tile({y, x, type}: TileProps) {

    const tileType = tileTypes[type]

    return (
        <img src={tileType.src} className="tile" style={{
            top: `${x}px`,
            left: `${y}px`,
            width: `${tileType.width}px`,
            height: `${tileType.height}px`,
        }}></img>
    )
}