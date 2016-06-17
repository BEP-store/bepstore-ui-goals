function getAll(repos, dataName) {
  return repos.toArray().reduce((memo, repo) => {
    return [].concat(memo, repo.get(dataName).toArray());
  }, []);
}

export const repoData = {
  getAll
};

export default repoData;
