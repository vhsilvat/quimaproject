CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INTEGER REFERENCES categories (id)
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER REFERENCES categories (id),
    available BOOLEAN NOT NULL,
    category_path VARCHAR(255),
    description VARCHAR(255)
);
--------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_product_category_path()
    RETURNS TRIGGER AS $$
DECLARE
    v_path TEXT := '';
    v_category_id INTEGER;
BEGIN
    v_category_id := (SELECT p.category_id FROM products p WHERE p.id = NEW.id);
    -- Traverse back all the "parent_id" references until it reaches the root
    LOOP
        v_path := (SELECT c.name FROM categories c WHERE c.id = v_category_id) || ' > ' || v_path;
        -- Check if the parent_id is null, in this case we reached the root
        IF (SELECT c.parent_id FROM categories c WHERE c.id = v_category_id) IS NULL THEN
            EXIT;
        END IF;
        -- Get the parent_id of the current category
        v_category_id := (SELECT c.parent_id FROM categories c WHERE c.id = v_category_id);
    END LOOP;
    -- Remove the final ' > ' character if v_path is not empty
    IF length(v_path) > 0 THEN
        v_path := substring(v_path from 1 for length(v_path) - 3);
    END IF;
    -- Update the category_path column with the final v_path
    UPDATE products SET category_path = v_path WHERE id = NEW.id;
    -- Return the modified NEW row to be inserted/updated in the table
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_product_on_category_delete()
    RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM products WHERE category_id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
--------------------------------------------------------------------------

CREATE TRIGGER update_product_category_path
    AFTER INSERT OR UPDATE OF category_id ON products
    FOR EACH ROW
EXECUTE FUNCTION update_product_category_path();

CREATE TRIGGER delete_product_on_category_delete
    BEFORE DELETE ON categories
    FOR EACH ROW
EXECUTE FUNCTION delete_product_on_category_delete();
--------------------------------------------------------------------------

INSERT INTO categories (name) VALUES ('Masculine');
INSERT INTO categories (name) VALUES ('Feminine');
INSERT INTO categories (name, parent_id) VALUES ('Apparel', (SELECT id FROM categories WHERE name = 'Masculine'));
INSERT INTO categories (name, parent_id) VALUES ('Clothing', (SELECT id FROM categories WHERE name = 'Apparel'));
INSERT INTO categories (name, parent_id) VALUES ('Shoes', (SELECT id FROM categories WHERE name = 'Apparel'));
INSERT INTO categories (name, parent_id) VALUES ('Accessories', (SELECT id FROM categories WHERE name = 'Masculine'));
INSERT INTO categories (name, parent_id) VALUES ('Perfume', (SELECT id FROM categories WHERE name = 'Accessories'));
INSERT INTO categories (name, parent_id) VALUES ('Beauty', (SELECT id FROM categories WHERE name = 'Feminine'));
INSERT INTO categories (name, parent_id) VALUES ('Shampoo', (SELECT id FROM categories WHERE name = 'Beauty'));


INSERT INTO products (name, price, category_id, available, description)
VALUES ('Blue T-Shirt', 19.99, (SELECT id FROM categories WHERE name = 'Clothing'), true, 'A blue T-shirt');
INSERT INTO products (name, price, category_id, available, description)
VALUES ('Black Shoes', 19.99, (SELECT id FROM categories WHERE name = 'Shoes'), true, 'A pair of black shoes');
INSERT INTO products (name, price, category_id, available, description)
VALUES ('Pink shampoo', 19.99, (SELECT id FROM categories WHERE name = 'Shampoo'), true, 'A shampoo');
