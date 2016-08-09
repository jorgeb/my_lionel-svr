UPDATE ${schema~}.my_boxes SET
 image_url = ${image_url},
 qr = ${qr},
 sort = ${sort}
 WHERE id = ${id}
returning *