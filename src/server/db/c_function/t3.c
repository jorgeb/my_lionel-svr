#include "postgres.h"
#include <string.h>
#include <stdlib.h>
#include "utils/geo_decls.h"

#ifdef PG_MODULE_MAGIC
PG_MODULE_MAGIC;
#endif

/* by value */


/* by reference, fixed length */

float4 *
add_one_float8(float4 *arg)
{
    float4    *result = (float4 *) palloc(sizeof(float4));

    *result = *arg;

    return result;
}


text *
copytext(text *t)
{
    /*
     * VARSIZE is the total size of the struct in bytes.
     */
    text *new_t = (text *) palloc(VARSIZE(t));
    SET_VARSIZE(new_t, VARSIZE(t));
    /*
     * VARDATA is a pointer to the data region of the struct.
     */
     
     float f = strtof(*t, NULL);
     
    memcpy((void *) VARDATA(new_t), /* destination */
           (void *) VARDATA(t),     /* source */
           VARSIZE(t) - VARHDRSZ);  /* how many bytes */
    return new_t;
}