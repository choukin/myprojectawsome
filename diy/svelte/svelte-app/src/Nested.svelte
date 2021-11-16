<p on:click={handleClick}>我也是段落

    Clicked {count}{count===1?'time':'times'} doubled is {double}
</p>
<script>
    let count = 0
    // 反应式声明
    $: double = count*2
    $: if(count>10){
        console.log(`the count is ${count}`)
        alert(`i said the count is ${count}`)
    }
    function handleClick(){
        count +=1
    }
</script>