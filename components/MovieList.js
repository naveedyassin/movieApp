

const MovieList = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (searchTerm) {
      setMovies([]);
      setPage(1);
      setHasMore(true);
      loadMovies();
    }
  }, [searchTerm]);

  const loadMovies = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const results = await fetchMovies(searchTerm, page);
      if (results && results.Search) {
        setMovies((prevMovies) => [...prevMovies, ...results.Search]);
        setPage((prevPage) => prevPage + 1);
        if (results.Search.length < 10) { // Adjust based on OMDb API page size
          setHasMore(false);
        }
      } else {
        setHasMore(false);
        if(page === 1){
          setMovies([])
        }
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const handleEndReached = () => {
    loadMovies();
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={(text) => setSearchTerm(text)} />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem movie={item} onPress={() => navigation.navigate('MovieDetail', { imdbID: item.imdbID })} />}
        keyExtractor={(item) => item.imdbID}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text style = {styles.emptyText}> {searchTerm ? "No Movies Found" : "Search for a movie"} </Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16
  }
});

export default MovieList;