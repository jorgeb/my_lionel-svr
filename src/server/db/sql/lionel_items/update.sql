UPDATE ${schema~}.lionel_items SET
  lionel_id = ${lionel_id},
 lionel_type_id = ${lionel_type_id},
 name = ${name},
 info = ${info},
 info_html = ${info_html},
 updated = ${updated},
 url = ${url},
 image_url = ${image_url},
 ins_image_url = ${ins_image_url},
 fav_type = ${fav_type}
 WHERE id = ${id}
returning *