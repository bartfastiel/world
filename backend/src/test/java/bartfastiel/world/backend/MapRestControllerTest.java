package bartfastiel.world.backend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MapRestControllerTest {

	@Test
	void getMap_whenCoordinatesAreaX0Y0_includeTree() {
		MapRestController mapRestController = new MapRestController();
		assertEquals("tree", mapRestController.getMap(0, 0).get(100).type());
	}

	@Test
	void getMap_whenCoordinatesAreaX0Y1_includeTent() {
		MapRestController mapRestController = new MapRestController();
		assertEquals("tent", mapRestController.getMap(0, 1).get(100).type());
	}

}