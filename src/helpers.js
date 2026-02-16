export const sortByName = (data, type = 'artists') => {
  if (type === 'artists') {
    return data.sort((a, b) => (a.fields?.['Last Name'] > b.fields?.['Last Name'] ? 1 : -1));
  }
  if (type === 'tags') {
    return data.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
};

export const dedupeObjectsById = (objects) => {
  return [...new Map(objects.map((x) => [x.id, x])).values()];
};

export const getFilteredByQuery = (query, tags, artists, artistsByTag) => {
  const str = query.toLowerCase().trim();
  const words = str.split(' ');
  const multiword = words.length > 1;

  const resultsFromNames = artists.filter((artist) => {
    const name = `${artist.fields['First Name'] || ''} ${artist.fields['Last Name'] || ''}`.trim();
    return name.toLowerCase().includes(str);
  });
  const multiwordTagMatches = multiword
    ? tags.filter((t) => str.includes(t.name.toLowerCase()))
    : [];

  let resultsFromTags;

  if (resultsFromNames.length && multiword) {
    resultsFromTags = [];
  } else if (multiwordTagMatches.length) {
    resultsFromTags = getFilteredByTags(multiwordTagMatches, artists);
  } else if (multiword) {
    const relevantTags = words.reduce((ret, word) => {
      const wordMatches = tags.filter((t) => word.includes(t.name.toLowerCase()));
      return [...ret, ...wordMatches];
    }, []);
    resultsFromTags = getFilteredByTags(relevantTags, artists);
  } else {
    const relevantTags = tags.filter((t) => t.name.toLowerCase().includes(str));
    resultsFromTags = relevantTags.reduce(
      (ret, t) => ret.concat(artistsByTag[t.name]),
      []
    );
  }
  const results = dedupeObjectsById([...resultsFromTags, ...resultsFromNames]);
  return sortByName(results);
};

export const getFilteredByTags = (tags, artists) => {
  const activeTagCount = tags.length;
  const results = artists.reduce((ret, artist) => {
    let matchCount = 0;
    tags.forEach((tag) => {
      if (artist.fields.Tags?.includes(tag.name)) {
        matchCount++;
      }
    });
    if (matchCount === activeTagCount) {
      return [...ret, artist];
    }
    return ret;
  }, []);
  return sortByName(results);
};
