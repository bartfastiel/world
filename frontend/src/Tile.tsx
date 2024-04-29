
type TileProps = {
    y: number
    x: number
}

export default function Tile({y, x}: TileProps) {

    return (
        <img src="ME_Singles_City_Props_16x16_Shrub_2.png" className="tile" style={{
            top: `${x}px`,
            left: `${y}px`,
        }}></img>
    )
}