install:
	npm i

start:
	npm run babel-node -- src/bin/gendiff.js

build: lint
	npm run build

b:
	npm run build

lint:
	npm run eslint src

fix:
	npm run eslint --fix src

test:
	npm run test

t:
	npm run test-watch

publish:
	npm publish
