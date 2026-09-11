'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pages = ['axono-sync.html', 'axono-display.html', 'axono-admin.html'];

for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
    .map(match => match[1])
    .filter(source => source.trim());

  inlineScripts.forEach((source, index) => {
    assert.doesNotThrow(
      () => new Function(source),
      `${page}: inline script ${index + 1} must compile`
    );
  });

  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map(match => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  assert.deepEqual([...new Set(duplicates)], [], `${page}: element IDs must be unique`);

  const localAssets = [...html.matchAll(/(?:src|href)=["']\/?([^"'#?]+)["']/gi)]
    .map(match => match[1])
    .filter(asset => !asset.includes('://') && !asset.startsWith('data:'));
  for (const asset of localAssets) {
    assert.ok(fs.existsSync(path.join(root, asset)), `${page}: missing local asset ${asset}`);
  }
}

console.log('AXONO static page checks passed');
