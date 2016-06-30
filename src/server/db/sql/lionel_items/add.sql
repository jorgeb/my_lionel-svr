INSERT INTO ${schema~}.lionel_items(
            lionel_id, lionel_type_id, name, info, info_html, updated, url, image_url, ins_image_url, fav_type)
    VALUES (${lionel_id}, ${lionel_type_id}, ${name}, ${info}, ${info_html}, ${updated}, ${url}, ${image_url}, ${ins_image_url}, ${fav_type})
    
    returning *