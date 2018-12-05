Prequisites:
- Python 2.7

After NPM install, you will need to run `npm run rebuild` to rebuild native modules.
This requires Python 2.7. To force NPM to use Python 2.7 when you have python 3+ installed, use the following commands:

```
npm config set python "python/2.7/directory"
npm run rebuild
```