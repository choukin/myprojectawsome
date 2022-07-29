function main() {
    const a = Math.random()*10+1
    console.log(a,'a');
    if(a<5){
        process.exit(1)
    }
}

main()