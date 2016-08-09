 INSERT INTO ${schema~}.my_boxes(
            image_url,
            qr,
            sort)
    VALUES (${image_url},
        ${qr},
        ${sort})
    
    returning *