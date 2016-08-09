INSERT INTO ${schema~}.my_lionel_items_assoc(
            lionel_id_1, lionel_id_2)
    VALUES (${lionel_id_1}, ${lionel_id_2})
    
    returning *