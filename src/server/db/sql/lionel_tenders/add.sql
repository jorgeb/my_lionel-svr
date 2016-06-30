INSERT INTO ${schema~}.lionel_tenders(
            lionel_id, title, link, snippet, htmlSnippet, pagemap_cse_image_src)
    VALUES (${lionel_id}, ${title}, ${link}, ${snippet}, ${htmlSnippet}, ${pagemap_cse_image_src})
    
    returning *