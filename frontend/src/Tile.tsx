
type TileProps = {
    col: number
    row: number
}

export default function Tile({col, row}: TileProps) {

    return (
        <img src="ME_Singles_City_Props_16x16_Shrub_2.png" className="tile" style={{
            top: `${row * 16}px`,
            left: `${col * 16}px`,
        }}></img>
    )
}