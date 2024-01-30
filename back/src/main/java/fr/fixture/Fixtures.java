package fr.fixture;

import java.util.List;
import java.util.Random;
import java.util.function.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class Fixtures {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private static int lastId = 0;
	private static int relationId = 0;
	private static int otherRelationId = 0;

	private void fakingDB(int number, List<String> columns, String tableName, Supplier<?>[] suppliers) {
		int columnsNumber = columns.size();
		tableName = tableName.replace("'", "");
		String insert = "INSERT INTO " + tableName + " (";
		String values = " VALUES (";

		for (int i = 0; i < columnsNumber; i++) {
			if ((i + 1) == columnsNumber) {
				insert += columns.get(i) + ")";
				values += "?)";
			} else {
				insert += columns.get(i) + ",";
				values += "?,";
			}
		}

		for (int id = 1; id <= number; id++) {
			Object[] params = new Object[suppliers.length];
			// params[0] = id;
			for (int i = 0; i < suppliers.length; i++) {
				params[i] = suppliers[i].get();
			}
			jdbcTemplate.update(insert + values, params);
		}
	}

    public boolean isDatatableExistAndDelete(String tableName) {
		if (isTableExist(tableName)) {
			// La table existe, on la vide
			deleteTable(tableName);
            
            return true;
		}

        return false;
	}

	public void launchFixtures(String tableName, int number, List<String> columns, Supplier<?>[] suppliers) {
		if (isTableExist(tableName)) {
			// La table existe, on la vide
			deleteTable(tableName);
			// On ajoute des données fictives
			fakingDB(number, columns, tableName, suppliers);

			lastId = 0;
			relationId = 0;
			otherRelationId = 0;
		}
	}

	private boolean isTableExist(String tableName) {

		return jdbcTemplate.queryForObject(
				"SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = " + tableName,
				Integer.class) > 0;
	}

	private void deleteTable(String tableName) {
		tableName = tableName.replace("'", "");
		jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS=0");
		jdbcTemplate.execute("TRUNCATE TABLE " + tableName);
		jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS=1");
	}

	/**
	 * 
	 * @return an id increment by one, according to the id's quantity defined at the
	 *         beggining
	 */
	public int id() {
		lastId++;
		return lastId;
	}

	/**
	 * 
	 * @return an other id increment by one, according to the id's quantity defined
	 *         at the beggining
	 */
	public int relationId() {
		relationId++;
		return relationId;
	}

	/**
	 * 
	 * @return a last id increment by one, according to the id's quantity defined at
	 *         the beggining
	 */
	public int otherRelationId() {
		otherRelationId++;
		return otherRelationId;
	}

	/**
	 * Choose image id on the website https://picsum.photos/images
	 * 
	 * @param the image id choosen
	 * @param the width wanted, prefered have a width > heigth
	 * @param the heigth
	 * 
	 * @return an image
	 */
	public String imageFakerById(Integer id, Integer heigth, Integer width) {

		return "https://picsum.photos/id/" + id.toString() + "/" + width.toString() + "/" + heigth.toString();
	}

	/**
	 * Choose image id on the website https://picsum.photos/images
	 * 
	 * @param the width wanted, prefered have a width > heigth
	 * @param the heigth
	 * 
	 * @return an image randomly
	 */
	public String imageFakerRandom(Integer heigth, Integer width) {
		Random random = new Random();
		Integer id = random.nextInt(1080) + 1;

		return "https://picsum.photos/id/" + id.toString() + "/" + width.toString() + "/" + heigth.toString();
	}
}
