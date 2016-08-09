UPDATE ${schema~}.my_extended_tender
            SET  lionel_tender_id = ${lionel_tender_id}
    WHERE  my_lionel_items_id = ${ my_lionel_items_id}
    returning *