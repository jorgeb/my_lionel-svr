UPDATE ${schema~}.my_boxes SET
 image_url = ${image_url},
 qr = ${qr}
 WHERE id = ${id}
returning *