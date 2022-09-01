process.stdin.pipe(process.stdout)

process.on('exit',()=>{
    const arg = process.argv.slice(2)
    console.error(arg.join(' '));
})

