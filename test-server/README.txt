NOTES
=====

Testing strategy here is what you'd expect--populate the database, do requests,
check database, again.

The only thing worth noting is that the data we generate for database population
OR server submissions (via PUT)  have `winRatio`s built in. This is really only
for making sure our GET requests are returning the right fields OR for
comparison in our PUT /my-scores request.

Our PUT endpoint doesn't accept `winRatio`, but calculates it, itself

-DR, 2017
