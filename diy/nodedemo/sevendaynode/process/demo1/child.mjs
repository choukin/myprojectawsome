process.on('SIGTERM', function () {
    console.log('hello');
    process.exit(0)
})