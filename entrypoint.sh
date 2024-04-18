#!/bin/sh

#Normally, I would not recommend you run a prisma migrate (or equivalent) here.
#Such things should be in its own separate one-off task, run only when migrations actually exist.
#However, for this abridged local stack demo it is fine since it appears to be idempotent in this case.
npx prisma migrate deploy

npm start
