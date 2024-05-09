package bartfastiel.world.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tiles")
public class MapRestController {

	@GetMapping("/{x}/{y}")
	public List<Tile> getMap(@PathVariable int x, @PathVariable int y) {
		var floor = new ArrayList<Tile>();
		for (int tileX = 0; tileX < 10; tileX++) {
			for (int tileY = 0; tileY < 10; tileY++) {
				floor.add(new Tile(tileX * 16, tileY * 16, "gras"));
			}
		}
		floor.add(new Tile(50, 50, "tree"));
		return floor;
	}
}
