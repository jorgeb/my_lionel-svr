INSERT INTO ${schema~}.lionel_tender_images(
            steam_tender_id, image_url, is_default)
    VALUES (${steam_tender_id}, ${image_url}, ${is_default})
    
    returning *