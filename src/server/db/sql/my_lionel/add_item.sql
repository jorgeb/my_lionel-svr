INSERT INTO ${schema~}.my_lionel_items(
    lionel_id,
    box_id,
    updated)    
VALUES (${lionel_id},
        ${box_id},
        ${updated})
   
returning *