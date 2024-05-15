package bartfastiel.world.backend;

import com.google.common.hash.Hashing;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/tiles")
public class MapRestController {

	@GetMapping("/{x}/{y}")
	public List<Tile> getMap(@PathVariable int x, @PathVariable int y) {
		long seed = Hashing.murmur3_128().newHasher()
				.putInt(x)
				.putInt(y)
				.hash()
				.asLong();

		var random = new Random(seed);
		var floor = new ArrayList<Tile>();

		for (int tileX = 0; tileX < 10; tileX++) {
			for (int tileY = 0; tileY < 10; tileY++) {
				floor.add(new Tile(tileX * 16, tileY * 16, "gras"));
			}
		}

		var isNextElementTree = random.nextBoolean();
		var tileType = isNextElementTree ? "tree" : "tent";

		floor.add(new Tile(50, 50, tileType));
		return floor;
	}
}
