UPDATE ${schema~}.my_lionel_items SET
 lionel_id = ${lionel_id},
    box_id = ${box_id},
    updated = ${updated}
 WHERE id = ${id}
returning *