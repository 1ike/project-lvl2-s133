#!/usr/bin/env node

import { launch, gendiff } from '../';

if (!module.parent) console.log(launch());

export default gendiff;
