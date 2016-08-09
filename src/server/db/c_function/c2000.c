#include "postgres.h"
#include <string.h>
#include "utils/geo_decls.h"

#include <stdio.h>
#include <math.h>

#define pi 3.141592653589793238462643383279

#ifdef PG_MODULE_MAGIC
PG_MODULE_MAGIC;
#endif


/* by reference, fixed length */

float8 *
deltaE2000(float8 *l1, float8 *a1, float8 *b1, float8 *l2, float8 *a2, float8 *b2)
{
    float8    *result = (float8 *) palloc(sizeof(float8));

    *result = *l1 + 4.0;

    return result;
}

float8 *
add_one_float8(float8 *arg)
{
    float8    *result = (float8 *) palloc(sizeof(float8));

    *result = *arg + 1.0;
    
     return result;
    

}