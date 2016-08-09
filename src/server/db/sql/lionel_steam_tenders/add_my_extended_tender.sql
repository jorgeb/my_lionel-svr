INSERT INTO ${schema~}.my_extended_tender(
            my_lionel_items_id, lionel_tender_id)
    VALUES (${my_lionel_items_id}, ${lionel_tender_id})
    
    returning *