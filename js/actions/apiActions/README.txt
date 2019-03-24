NOTES:
=========================================================================
The logInSuccess, logOff, makeUserAccount actions success all update
`authToken` and `name` fields in localStorage. These are retrieved as our
initial state for our reducer.

I've not bothered to write an action for account deletion, because that
doesn't belong in the MVP client. If it ever gets written, in belongs in
./actionsAccountAndPassword.js

-DR, 2019
