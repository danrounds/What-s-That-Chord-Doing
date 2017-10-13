# NOTES

Testing strategy here is what you'd expect--populate the database, do requests,
check database, again.

The only thing worth noting is that the data we generate for database population
OR server submissions (via PUT)  have `winRatio`s built in. This is really only
for making sure our `GET requests` are returning the right fields AND for
comparison in the test for `PUT /my-scores`.

`PUT /my-scores` doesn't do anything with the `winRatio` we include in our
request, but calculates it, itself (i.e. it's not affecting the "integrity" of
anything that happens, server side).

-DR, 2017
