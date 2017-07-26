#!/bin/sh

rm build/app.bundle.js build/app.bundle.js.map
npm run archive
open ./build
