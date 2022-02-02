module.exports = {
    resolve: {
        fallback: {
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util/'),
            zlib: require.resolve('browserify-zlib'),
        },
    },
};
