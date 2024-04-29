package bartfastiel.world.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tiles")
public class MapRestController {

	@GetMapping
	public List<Tile> getMap() {
		var floor = new ArrayList<Tile>();
		for (int x = 0; x < 10; x++) {
			for (int y = 0; y < 10; y++) {
				floor.add(new Tile(x * 16, y * 16, "gras"));
			}
		}
		floor.add(new Tile(50, 50, "tree"));
		return floor;
	}
}
