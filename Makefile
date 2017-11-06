install:
	npm i

start:
	npm run babel-node -- src/bin/gendiff.js -V

build: lint
	npm run build

b:
	npm run build

lint:
	npm run eslint src

fix:
	npm run eslint --fix src

publish:
	npm publish
