# bsl-random-word

You can start a local server with `python3 -m http.server 8000`
Or more likely `python3 -m http.server 80` / `python -m http.server 80` depending on your setup
It doesn't require any particular virtualenv.

## Adding words

1. Create a file in the wordlists directory.
2. Add a js list, and export it.
3. Add an import to RandomWord.js, and add the collection to masterList.
